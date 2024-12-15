
# Instructions for university team and submission. Instructions may be outdated  
. # Blockbuster Battle COMPX 527 Group Project

This implementation of the Blockbuster Battle online game is the proposed solution and explanation of the implemented solution to the COMPX 527 Secure Cloud Applications cloud based application assignment.

## **Front-end Web Application**

The front-end web application is a web based game where players must sign-up and log with an email to play the game.

The game is a higher/lower based game where the player has a choice between two movies whith one movie showing its rating and another one that is hidden. If the user selects the moveie with the higher score then the player gets a point. The game goes on for 10 rounds

### Demo
1. Clone Repo `git clone git@github.com:O-LavenderAshburn/BlockbusterBattle.git'
2. `npm install`
3. `npm run dev`

### Deployment

To deploy the front-end application :

1. Go to the blockbuster_battle_app/blockbuster_battle repo and run npm build
2. Go to the blockbuster-battle-app S3 bucket on AWS
3. Select the contents of the bucket and dlelte them
4. Go to the Cloudfront Distrobution E1Y8LY8Q3VU6SO on AWS
5. Go to invalidatio Add object paths enter: /\*
6. select create invalidation
7. Go to the S3 bucket and select 'upload'
8. Upload the contents in the 'dist' directory generated from the build

-1.index.html (file)

-2. vite.svg (file)

-3.assets (folder)


The live web application can be accessed on:
https://blockbuster.odin.nz

## **Back-end Server Application**

The Backend Server application manages requests from the front-end web application. The server uses JSON Web Toekns for authenticating requests before communicating with the server throig a REST API.

### Deployment

To deploy the back-end application :

1. Start the RDS database
2. Go to the Ec2 on AWS
3. cd into the blockbuster_battle_backend Direcorty/Repository `cd blockbuster_battle_backend`
4. Run `nvm use v20.17.0`
5. Run `nohup bash -c 'while true; do npm start; done'` to keep the server running or `npm start`

### Teardown

1. Stop the Ec2 Instance
2. Stop the RDS database

