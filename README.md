# Profile Image Creator

The idea for this project came because I often had the need to make a profile image into a circle, instead of a square. But if you don't use Photoshop, or unoptimized results etc. it is not to easy do this effect. So I decided to make a web app that inputs an image and outputs an optimized circle image - easily.

Furthermore, this project's purpose is also to add to my skills in Angular.

- [x] Best practice architecture
- [x] Lazy loaded features modules
- [x] Use SASS - files structure best practice, mixins etc.
- [x] Use CSS Grid and Flexbox for layout and responsiveness
- [x] Use template driven approach for subscriptions
- [x] Crop image to circle using canvas techiques
- [x] Setup firebase storage rules / authentication to allow upload image and download resized images
- [x] Upload image, rezise to 3 sizes, and option to download <https://www.codewithchintan.com/how-to-upload-and-display-image-file-in-pwa-angular-project-using-firebase-cloud-storage-and-angularfire/amp/>
- [x] Make use of Angular Material for theme, colors and components
- [x] Make loading while waiting few seconds to generate thumbnails and make retry button in toast
- [x] Remove option to keep uploading same image, but use already uploaded
- [x] Be able to download the image when clicking the link, not to open in new page (failed - adding the download to the element doesn't work)
- [x] Be able to rotate image
- [x] Be able to scale the image (failed - whole canvas edit should have been written differently, not changing the image on the canvas, but changing the canvas and in the end drawing the image to fit the modified canvas)
- [x] Make firebase function scheduled cronjob to cleanup thumbnail folder everyday (failed - must be on billing account)
- [x] Add angular material dialog for error messages and delete promt
- [x] Add Testing, unit test and possibly e2e test
- [ ] Setup CI/CD with GitHub Actions and workflow, so when to push/merge to GitHub Master branch -> automatically test and deploy to firebase. Setup prettier check.

## Tools

- [AngularFire](https://github.com/angular/angularfire)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Angular CLI](https://github.com/angular/angular-cli)

## Commands

Serve code

```bash
npm run start
```

Run tests

```bash
npm run test
```

Deploy code to firebase

```bash
npm run deploy:hosting
```

Deploy code and firebase functions to firebase

```bash
npm run deploy:all
```

Run webpack analyze tool

```bash
npm run analyze
```
