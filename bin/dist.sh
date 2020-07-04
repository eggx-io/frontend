# make sure you're using a bash-based terminal
# make sure your working (terminal) directory is that of this project (i.e. same dir as angular.json)
# run `chmod +x bin/dist.sh` to make this file executable
# then run `bin/dist.sh` to build the distribution ZIP

echo "Packing eggx-external project for distribution"
echo "WARNING: Sensitive information will be included in this dist. Make sure you know who you're giving this to."
echo ""

PARENT=dist
FOLDER=eggx-external
FILE=bin/eggx-external_dist.tar.gz
CONFIG=app.yaml

rm $FILE

ng build --prod

echo "Compressing..."

tar.exe -czf $FILE $CONFIG -C $PARENT $FOLDER

echo "$FILE created"