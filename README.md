![trive.news](https://trive.news/wp-content/uploads/2018/01/discover-banner-4.png)

# trive.news Demo DApp Summary
This is a DApp (Decentralized Application) that shows a lean version of a global decentralized truth discovery network based on trive.news whitepaper. The goal is to find out how reliable the sources of a news story maybe. Here a user can sign up by creating a username, their profile is automatically connected to their metamask ethereum accounts, they can then submit a story to be verified by a researcher. The tasks information is stored on IPFS (a peer-to-peer method of storing and sharing hypermedia in a distributed file system). On the user's profile a list of of submitted stories and information about their tasks is displayed. The researcher can take on the job of verifying and presenting supporting facts of the validity of the story. 


To learn more about trive.news and read the whitepaper, please check out [https://trive.news/whitepaper/](https://trive.news/whitepaper/).

## Try Demo DApp on your Ganache Test Network

This demo is currently running on a local Ganache Test Network. 


## Run Demo DApp

### 1. Check node version

Make sure you have `node` installed and it's version 8.5.0 or greater

```
node --version
```
### 2. Check that truffle is installed

Make sure you have `truffle` installed

```
npm install -g truffle
```

### 3. Set up DApp 

In a new tab:
```
git clone https://github.com/trivenews/Dapp-team Dapp-team && cd ipfs-trive-news
npm install
truffle compile
truffle migrate
npm run start
```

A browser will open to http://localhost:3000. If you don't have the MetaMask extension (or another wallet provider) follow instructions of the next step.


### 4. Set up MetaMask

- Install [MetaMask Chrome Browser Extension](https://metamask.io/).

- Follow the instructions to set up your wallet.

- Click where it says "Ethereum Main Network" and select Custom RPC. For the New RCP URl add http://localhost:7545 make sure you have Ganache installed and running. [Ganache] (https://github.com/trufflesuite/ganache)

**Be careful not to mix up your test wallet with your real one on the Main Network.**



### 5. Try it!
Create a listing and post it to IPFS and Ethereum.

# Roadmap

*This is a tentative list of coming features and is subject to change*

## Alpha Release

* [] Users can submit content URLs into the system.
* [] Content available for research can be displayed for researchers to see.
* [] Researcher has the ability to select stories to research.
* [] Researcher has the ability to upload research documents to be stored on IPFS.
* [] Basic reputation system - users earn one point for 'good' actions, they lose 5 for 'bad' actions
* [] Users can choose their role as long as they have the required minimum reputation for that role
* [] Verifiers can be randomly assigned to verify stories
* [] Witnesses can assign percentage values denoting the 'truthfullness' of a story

## Beta Release

* [ ] Implement conflict resolution system with voting

## Version 1

* [ ] More advanced reputation system - decide on, and implement, advanced and weighted reputation system

## Future...

