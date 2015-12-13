# TODO: Move to react_on_rails
class EnsureAssetsCompiled
  def self.check_built_assets
    return if @checked_built_assets
    build_all_assets
  end

  def self.running_webpack_watch?(type)
    running = `pgrep -fl '\\-w \\-\\-config webpack\\.#{type}\\.rails\\.build\\.config\\.js'`
    if running.present?
      puts "Found process, so skipping rebuild => #{running.ai}"
      return true
    end
  end

  def self.build_assets_for_type(type)
    unless running_webpack_watch?(type)
      build_output = `cd client && npm run build:#{type}`
      if build_output =~ /error/i
        fail "Error in building assets!\n#{build_output}"
      else
        puts "Webpack build completed."
      end
    end
  end

  def self.build_all_assets
    build_assets_for_type("client")
    build_assets_for_type("server")
    @checked_built_assets = true
  end
end
