#!/bin/bash

PACKAGE=$1

# if they didn't pass a package, loop through all the modules and reinstall them
if [[ $# -eq 0 ]]; then
    echo "Uninstalling all packages and reinstalling them from local modules"
    for dir in ./modules/*; do
        if [ -d "$dir" ]; then
            package=$(basename $dir)
            rm -rf ./node_modules/$package
            npm uninstall $package && npm i ./modules/$package
        fi
    done
else
  # if they passed a package only reinstall that package
  echo "Uninstalling $PACKAGE and reinstalling it from local modules"
  npm uninstall $PACKAGE && npm i ./modules/$PACKAGE
fi

echo "Done"
