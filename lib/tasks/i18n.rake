require "erb"

namespace :i18n do
  desc "Convert rails locales to js files for React.js."
  task to_js: :environment do
    @translations, @defaults = translations
    @default_locale = default_locale

    create_js_file(template_translations_js, path_translations_js)
    create_js_file(template_default_js, path_default_js)
  end

  def create_js_file(template, path)
    result = ERB.new(template).result()
    File.open(path, "w") do |f|
      f.write(result)
    end
  end

  def translations
    translations = {}
    defaults = {}
    locale_files.each do |f|
      translation = YAML.load(File.open(f))
      key = translation.keys[0]
      val = flatten(translation[key])
      translations = translations.deep_merge({key => val})
      defaults = defaults.deep_merge(flatten_defaults(val)) if key == default_locale
    end
    return translations.to_json, defaults.to_json
  end

  def format(input)
    input.to_s.gsub(".", "_").camelize(:lower).to_sym
  end

  def flatten_defaults(val)
    flatten(val).each_with_object({}) do |(k, v), h|
      key = format(k)
      h[key] = { id: k, defaultMessage: v }
    end
  end

  def flatten(translations)
    translations.each_with_object({}) do |(k, v), h|
      if v.is_a? Hash
        flatten(v).map { |hk, hv| h["#{k}.#{hk}".to_sym] = hv }
      else 
        h[k] = v
      end
    end
  end

  def default_locale
    ReactOnRails.configuration.default_locale || "en"
  end
  
  def locale_files
    Rails.application.config.i18n.load_path
  end

  def path_translations_js
    i18n_dir + "translations.js"
  end

  def path_default_js
    i18n_dir + "default.js"
  end

  def i18n_dir
    ReactOnRails.configuration.i18n_dir || default_i18n_dir
  end

  def default_i18n_dir
    Rails.root.join("client", "app", "libs", "i18n")
  end

  def template_translations_js
    "export const translations = <%= @translations %>;"
  end

  def template_default_js
%q(import { defineMessages } from 'react-intl';

const defaultLocale = '<%= @default_locale %>';

const defaultMessages = defineMessages(<%= @defaults %>);

export { defaultMessages, defaultLocale };
)
  end
end