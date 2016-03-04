## ANXS - git [![Build Status](https://travis-ci.org/ANXS/git.png)](https://travis-ci.org/ANXS/git)

Ansible role which installs Git. Offers the option to install from source, as well as to run a daemon as server.


#### Notes
If you want the server to be running, you should not install from source.


#### Requirements & Dependencies
- Tested on Ansible 1.4 or higher
- ANXS.build-dependencies for building git from source.


#### Variables

```yaml
git_install_from_source: no
git_prefix: "/usr/local"
git_version: "1.9.0"

git_install_server: no
git_server_base_path: "/srv/git"
git_server_export_all: yes
```


#### License

Licensed under the MIT License. See the LICENSE file for details.


#### Feedback, bug-reports, requests, ...

Are [welcome](https://github.com/ANXS/git/issues)!
