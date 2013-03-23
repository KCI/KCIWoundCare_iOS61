# How to Compile KCI Wound Care 

##Prequisites

There are a few pre-requisites required to compile the app. 

1. [Xcode installed](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
2. Git installed (comes with xcode command line tools)
3. [Sencha CMD](http://www.sencha.com/products/sencha-cmd/download) 
4. Compass gem - `sudo gem install compass`

Once all of the prequisites are installed we can move forwaord with the build.

## Build

Start by cloning the repository:

````
git clone http://path/to/repository 
```` 

Next `cd` to the folder:

````
cd KCIWoundCare
````

Now we should be able to build the app.

````
sencha app build native
````

##Transfer
This will create a `build` folder that houses all of the compiled code that will be transferred to the `www` folder in the Hybrid app.

````
cp -R build/KCI/package ../KCI-WoundCare-Hybrid
````

