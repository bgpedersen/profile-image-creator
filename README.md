# ProfileImageCreator (WORK IN PROGRESS!)

The idea for this project came because I often had the need to make a profile image into a circle, instead of a square. But if you don't use Photoshop, or unoptimized results etc. it is not to easy do this effect. So I decided to make a web app that inputs an image and outputs an optimized circle image - easily.

Furthermore, this project's purpose is also to add to my skills in Angular. TODO list:

- [x] Best practice architecture
- [x] Lazy loaded features modules
- [x] Use SASS - files structure best practice, mixins etc.
- [x] Use CSS Grid and Flexbox for layout and responsiveness
- [x] Use template driven approach for subscriptions
- [x] Crop image to circle using canvas techiques
- [x] Setup firebase storage rules / authentication to allow upload image and download resized images
- [x] Upload image, rezise to 3 sizes, and option to download https://www.codewithchintan.com/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-angularfire/amp/
- [x] Make use of Angular Material for theme, colors and components
- [x] Make loading while waiting few seconds to generate thumbnails and make retry button in toast
- [x] Remove option to keep uploading same image, but use already uploaded
- [x] (failed) Be able to download the image when clicking the link, not to open in new page
- [ ] Make firebase function to cleanup thumbnail folder everyday
- [ ] Add Testing (unit test and possibly e2e test)
- [ ] Add NgRX state management
- [ ] Setup CI/CD with GitHub Actions and workflow, so when to push/merge to GitHub Master branch -> automatically test and deploy to firebase

## Tools

- [AngularFire](https://github.com/angular/angularfire)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Angular CLI](https://github.com/angular/angular-cli)

## Commands

**Run and open in browser**

`npm run start`

**Deploy to firebase hosting**

`npm run deploy:hosting`

**Deploy everything including firebase functions etc**

`npm run deploy:all`

## Tips for coding

**Scafolding**

Build new lazy loaded feature and add route to main module

`ng g m features/heroes --route --heroes-list --module app.module`

Add pages/components to the new feature module

`ng g c features/heroes/heroes-list`
