# run the build command
set NODE_OPTIONS="--max-old-space-size=16384" && npm run build

# after the build has finished running, go into the build directory
cd build

# initialize git repository in the build directory
git init

# add the remote origin
git remote add origin git@github.com:Shuttlelane-Limited/shuttlelane-frontend-build.git

# stage all the build files
git add .

# switch to main branch
git branch -M main

# commit build files
git commit -m "INIT V1.0"

# push build files
git push -u origin main