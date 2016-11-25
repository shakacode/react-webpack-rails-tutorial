CAPYBARA_TIMEOUT_RETRIES = 5

# HACK: workaround for Capybara Poltergeist StatusFailErrors, simply retries
# based on https://gist.github.com/afn/c04ccfe71d648763b306
RSpec.configure do |config|
  config.around(:each, type: :feature) do |ex|
    example = RSpec.current_example
    CAPYBARA_TIMEOUT_RETRIES.times do
      example.instance_variable_set("@exception", nil)
      __init_memoized
      ex.run

      example_ex = example.exception

      break unless example_ex

      is_multiple_exception = example_ex.is_a?(RSpec::Core::MultipleExceptionError)

      break unless example_ex.is_a?(Capybara::Poltergeist::StatusFailError) ||
                   example_ex.is_a?(Capybara::Poltergeist::DeadClient) ||
                   is_multiple_exception

      if is_multiple_exception
        m_exceptions = example_ex.all_exceptions

        idx = m_exceptions.find_index do |exception|
          exception.is_a?(Capybara::Poltergeist::StatusFailError) ||
            exception.is_a?(Capybara::Poltergeist::DeadClient) ||
            exception.class < SystemCallError
        end

        break unless idx
      end

      puts "\n"
      puts "=" * 80
      puts "Exception caught! #{example_ex.ai}"
      puts "when running example:\n  #{example.full_description}"
      puts "at #{example.location}"
      puts "Restarting phantomjs and retrying..."
      puts "  -> If this doesn't work, put a modest sleep before your last assertion."
      PhantomJSRestart.call
      puts "=" * 80
    end
  end
end

module PhantomJSRestart
  def self.call
    puts "-> Restarting phantomjs: iterating through capybara sessions..."
    session_pool = Capybara.send("session_pool")
    session_pool.each do |mode, session|
      msg = "  => #{mode} -- "
      driver = session.driver
      if driver.is_a?(Capybara::Poltergeist::Driver)
        msg += "restarting"
        driver.restart
      else
        msg += "not poltergeist: #{driver.class}"
      end
      puts msg
    end
  end
end
