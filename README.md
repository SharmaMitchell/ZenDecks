# ZenDecks: Next-gen Flashcards

ZenDecks is a free, open source flashcard webapp with full Markdown and LaTeX support. ZenDecks is a feature-rich alternative to Quizlet, Anki, Memrise, and other spaced repetition systems. CSV import/export is fully supported, meaning that ZenDecks decks are compatible with Quizlet, Anki, Memrise, Excel, and many other apps!

<img src="https://user-images.githubusercontent.com/90817905/232629825-6cca7f6e-2859-4e68-86f2-42aaf4171534.png" width="720px" alt="ZenDecks Landing page device mockups" />


## Tech Stack

**Frontend**: TypeScript, ReactJS, Redux, SCSS, Framer Motion, Swiper  
**Backend**: Firebase, Cloud Firestore

### Firebase User Auth

- Currently support Google account sign-in
- Email/Password sign-in coming soon

### Cloud Firestore Database

**Data Model**:

- Decks collection
  - Deck metadata (stored directly on the deck document: author, title, description, tags, etc.)
  - Cards subcollection
    - front (string)
    - back (string)
  - Ratings subcollection
    - id (string, the id of the user document corresponds to a user's unique uid)
    - score (number, between 1 and 5)
  - Users subcollection
    - id (string, the id of the user document corresponds to a user's unique uid)
- Users collection
  - username (string, unique)
  - photoURL (string, url to user's Google account photo)

### Redux State Management

- Stores deck data loaded from cloud firestore
- Keeps track of deck review progress for the session

### Modular SCSS Styles

- One `module.scss` file per component
- BEM naming conventions used (e.g. `[block]__[element]__[modifier]`)
- Global *CSS* variables defined in `index.scss` (e.g. `var(--background-color)`)
- Dark theme defined in `index.scss` (css variables will swap to dark palette on toggle)
  - See `App.tsx` for toggle logic (using `window.matchMedia` for default theme, storing toggle state in localStorage)

### Framer Motion Animations

- Transitional animations on component mount

### Swiper Carousel

- Swiper.js used to implement carousels across the site, including "Preview" section on homepage, card previews on deck info panels, and study mode.

## Contributing

Post an issue, or respond to an open issue to get started. Feel free to contact the main developer, Mitchell, via [Email](mailto:sharmamitch+gh@gmail.com) if you have any questions.

To run the codebase locally:

- Ensure that you have [Node.js](https://nodejs.org/), and [Git](https://git-scm.com/) installed.
- Clone the repository by running `git clone https://github.com/SharmaMitchell/ZenDecks.git` from the directory where you want the codebase stored
- Run `npm install`, to install the required dependencies
- Run `npm start` to start a local server for the React application

To Contribute:

- Fork the repository
- Implement your feature, bugfix, or idea
- Submit a pull request
  - Detail your changes in the pull request
  - Document functions and component using TSDoc comments ([Example](https://github.com/SharmaMitchell/ZenDecks/blob/14fc5a07d2fbb8cde09c4d331bdb76bbe246fc66/src/components/CardCreation/CardCreation.tsx#L16-L25))
  - Please follow style guidelines (nothing too strict, just use Prettier and use BEM naming for any SCSS)

## License

This work is licensed under a
[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License][cc-by-nc-nd].
<!--
CC BY-NC-ND is a Creative Commons license that allows others to share and use the licensed work, but with some restrictions. This license permits others to copy and distribute the work, as long as they attribute the author, do not use the work for commercial purposes, and do not make any changes or derivatives to the work. The license also does not permit anyone to host the work privately or use it in a commercial context without the explicit permission of the author. Therefore, under this license, contributions to the codebase are allowed as long as they are non-commercial, do not create derivatives of the original work, and are made with attribution to the original author.
-->
See `LICENSE.md` for the full license text  

**TL;DR:**
- Allowed:  
  ✅ Contributions (code, issues, documentation, etc.)  
  ✅ Non-comercial use (access, collaboration, running locally, etc.)
- Not Allowed  
  ❌ Deploying spnioffs or derivatives  
  ❌ Commercial use or adaptation  

[![CC BY-NC-ND 4.0][cc-by-nc-nd-image]][cc-by-nc-nd]

[cc-by-nc-nd]: http://creativecommons.org/licenses/by-nc-nd/4.0/
[cc-by-nc-nd-image]: https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png
[cc-by-nc-nd-shield]: https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg

## Work in Progress

ZenDecks is an early-stage work in progress; many features are currently missing or incomplete. Suggestions are welcome in the issues tab, as are contributions!

## Development Screenshots
<img src="https://user-images.githubusercontent.com/90817905/232630245-9ce26b1a-b983-4dfb-9277-85aafc97d9e3.jpg" width="720px" alt="Home page"/>  
<img src="https://user-images.githubusercontent.com/90817905/232630267-f43044d8-0b29-45eb-8211-fab478a0bdcf.jpg" width="720px" alt="About page"/>  
<img src="https://user-images.githubusercontent.com/90817905/232630330-9a1c4dd0-92c2-4d9b-86c7-f7e6d1aedba2.jpg" width="720px" alt="Decks page"/>  
<img src="https://user-images.githubusercontent.com/90817905/232630395-77bca600-3919-4821-bdda-0222c560111b.jpg" width="720px" alt="Edit Deck page"/>  
<img src="https://user-images.githubusercontent.com/90817905/232630425-dcf7f100-232e-4e7f-b0cc-50d052e604d9.jpg" width="720px" alt="Study Deck page"/>  
