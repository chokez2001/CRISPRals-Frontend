## Step 1: Install dependencies

```
 npm i
```

## Step 2: Configure the runtime environment.

## Step 2.1: Create configuration file

```
cp .env.example .env.local
```

## Step 2.2: Set the appropriate values in .env.local

## To run in "prod" mode

```
 npm run dev
```

## To build the web app (for production)

```
 npm run build
```

## To run in "prod" mode

```
 npm run start
```

## Last Updates

### September

  - Initial spelling and typographical correction. 

- **September 18:**
  - Implemented visualization and download functionality for the laboratory.
- **September 19:**
  - Rebuilt the backend laboratory using the `bio.blast` library.
- **September 20:**
  - Improved the `dialogcrispr` and had a  the appearance of the laboratory and fixing database issues.
- **September 21:**
  - Completed the `bio.blast` implementation.
  - Added missing formats for loading fasta files.
  - Extended information in `Crisprdialog` (type and observation).
- **September 22:**
  - Fixed errors in the build and deployed the page on the university server.
   **September 25:**


### October

- **October 2:**
  - Met with Professor Hidrovo to create a Shell script for using `Crispridentify` from the main environment.
- **October 3:**
  - Initial implementation of the third lab (no response yet).
- **October 4:**
  - Revised the logic of the complete lab.
- **October 6:**
  - Packaged the third lab as a zip file.
- **October 9:**
  - Simplified the lab and implemented multiprocessing.
- **October 20:**
  - DEPLOYMENT of phylotype and `Crispridentify` analysis.

### November

- **November 6:**
  - DEPLOYMENT with Professor Francisco.
- **November 9:**
  - Meeting with Professor Castillo.

### December

- **December 10:**
  - Spent 3 hours with Professor Hidrovo trying to resolve `gunicorn` issues.
