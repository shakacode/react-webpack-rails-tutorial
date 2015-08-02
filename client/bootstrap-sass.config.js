// IMPORTANT: Make sure to keep the customizations defined in this file
//            in-sync with the ones defined in app/assets/stylesheets/_bootstrap-custom.scss.

module.exports = {
  bootstrapCustomizations: './assets/stylesheets/_bootstrap-variables-customization.scss',
  mainSass: './assets/stylesheets/_app-styling-post-bootstrap-loading.scss',

  // Default for the style loading is to put in your js files
  // styleLoader: 'style-loader!css-loader!sass-loader',

  // See: https://github.com/sass/node-sass#outputstyle
  //      https://github.com/sass/node-sass#imagepath
  styleLoader: 'style-loader!css-loader!sass-loader?imagePath=/assets/images',

  // ### Scripts
  // Any scripts here set to false will never make it to the client,
  // i.e. it's not packaged by webpack.
  scripts: {
    transition: true,
    alert: true,
    button: true,

    // excluding as an example
    carousel: false,
    collapse: true,
    dropdown: true,

    // excluding as an example
    modal: false,
    tooltip: true,
    popover: true,
    scrollspy: true,
    tab: true,
    affix: true,
  },

  // ### Styles
  // Enable or disable certain less components and thus remove
  // the css for them from the build.
  styles: {
    mixins: true,

    normalize: true,
    print: true,

    scaffolding: true,
    type: true,
    code: true,
    grid: true,
    tables: true,
    forms: true,
    buttons: true,

    'component-animations': true,
    glyphicons: true,
    dropdowns: true,
    'button-groups': true,
    'input-groups': true,
    navs: true,
    navbar: true,
    breadcrumbs: true,
    pagination: true,
    pager: true,
    labels: true,
    badges: true,

    // excluding as an example
    jumbotron: false,
    thumbnails: true,
    alerts: true,

    // excluding as an example
    'progress-bars': false,
    media: true,
    'list-group': true,
    panels: true,
    wells: true,
    close: true,

    modals: true,
    tooltip: true,
    popovers: true,
    carousel: true,

    utilities: true,
    'responsive-utilities': true,
  },
};
