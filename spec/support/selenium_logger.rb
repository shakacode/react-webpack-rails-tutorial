RSpec.configure do |config|
  config.after(:each, :js) do
    next unless [:selenium_chrome, :selenium_chrome_headless].include?(Capybara.current_driver)

    errors = []

    page.driver.browser.manage.logs.get(:browser).each do |entry|
      next if entry.message =~ /Download the React DevTools for a better development experience/

      # Chrome doesn't allow suppressing log entries for network responses with statuses >= 400 (even if this is valid
      # api behaviour) and always show them in log as SEVERE errors prior to any js error resolving. Some info here:
      # https://bugs.chromium.org/p/chromium/issues/detail?id=677599
      # https://bugs.chromium.org/p/chromium/issues/detail?id=124534
      # https://bugs.chromium.org/p/chromium/issues/detail?id=96212
      # This doesn't skips unhandled js errors which should be properly catched
      next if @skipped_chrome_network_errors&.any? do |e|
        entry.message.include? \
          "#{e[:path]} - Failed to load resource: the server responded with a status of #{e[:status]}"
      end

      # needs external mock server for selenium
      if entry.message =~ /res.cloudinary.com/
        puts entry.message
        next
      end

      # several places SLV
      if entry.message =~ /"Warning: Text content did not match. Server: \\"1000\\" Client: \\"1,000\\""/
        puts entry.message
        next
      end

      pretty_message = if entry.message =~ %r{http://(127.0.0.1|app.lvh.me)[^ ]+ [\d:]+ }
                         entry.message[/[^ ]+ [^ ]+ (.*)$/, 1]&.gsub(/\A"|"\Z/, "")&.gsub(/\\n/, "\n")
                       else
                         entry.message
                       end

      %w[DEBUG INFO WARNING].include?(entry.level) ? puts(pretty_message) : errors << pretty_message
    end

    page.driver.browser.manage.logs.get(:driver).each do |entry|
      %w[DEBUG INFO WARNING].include?(entry.level) ? puts(entry.message) : errors << entry.message
    end

    raise("Java Script Error(s) on the page:\n\n" + errors.join("\n")) if errors.present?
  end
end
