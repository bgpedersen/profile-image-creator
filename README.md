# ProfileImageCreator (WORK IN PROGRESS!)

The idea for this project came because I often had the need to make a profile image into a circle, instead of a square. But if you don't use Photoshop, or unoptimized results etc. it is not to easy do this effect. So I decided to make a web app that inputs an image and outputs an optimized circle image - easily.

Furthermore, this project's purpose is also to add to my skills in Angular. TODO list:

- [x] Best practice architecture
- [x] Lazy loaded features modules
- [x] Use correct HTML sematic
- [x] Use SASS - files structure best practice, mixins etc.
- [x] Use CSS Grid
- [x] Use template driven approach for subscriptions
- [ ] Image editing (Upload image, crop to circle, download)
- [ ] Angular Material or other useful UI Framework
- [ ] Add Testing (unit test and possibly e2e test)
- [ ] PWA (offline support)
- [ ] Authentication
- [ ] Guards
- [ ] Save images to firestore for logged in user
- [ ] Setup CI, so when to push/merge to GitHub Master branch -> automatically deploy to firebase

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
