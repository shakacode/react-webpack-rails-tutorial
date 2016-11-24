CAPYBARA_TIMEOUT_RETRIES = 4

# HACK: workaround for Capybara Poltergeist StatusFailErrors, simply retries
# from https://gist.github.com/afn/c04ccfe71d648763b306
RSpec.configure do |config|
  config.around(:each, type: :feature) do |ex|
    example = RSpec.current_example
    CAPYBARA_TIMEOUT_RETRIES.times do
      example.instance_variable_set("@exception", nil)
      __init_memoized
      ex.run

      puts "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
      puts "poltergeist.rb: #{__LINE__},  method: #{__method__}"
      puts "example.exception = #{example.exception.ai}"
      puts "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"

      break unless example.exception.is_a?(Capybara::Poltergeist::StatusFailError)
      puts("\nCapybara::Poltergeist::StatusFailError at #{example.location}\n   Restarting phantomjs and retrying...")
      PhantomJSRestart.call
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
