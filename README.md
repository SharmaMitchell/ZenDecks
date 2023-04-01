# ZenDecks: Effortless Flashcards

ZenDecks is a free, open source flashcard webapp with full Markdown and LaTeX support. ZenDecks is a feature-rich alternative to Quizlet, Anki, Memrise, and other spaced repetition systems. CSV import/export is fully supported, meaning that ZenDecks decks are compatible with Quizlet, Anki, Memrise, Excel, and many other apps!

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
    - id (string, id of the user who rated the deck == id of the rating document)
    - score (number, between 1 and 5)
  - Users subcollection
    - id (the id of the user document is the id of one user of the deck)
- Users collection
  - username (string, unique)
  - photoURL (string, url to user's Google account photo)

### Redux State Management

- Stores deck data loaded from cloud firestore
- Keeps track of deck review progress for the session

### Modular SCSS Styles

- One `module.scss` file per component
- BEM naming conventions used (e.g. `[block]_[element]___[modifier]`)
- Global _CSS_ variables defined in `index.scss` (e.g. `var(--background-color)`)
- Dark theme defined in `index.scss` (css variables will swap to dark palette on toggle)
  - See `App.tsx` for toggle logic (using `window.matchMedia` for default theme, storing toggle state in localStorage)

### Framer Motion Animations

- Subtle animations on component mount (usually fading in opacity and transitioning y position up from ~20px offset)
- Globally defined animation parameters coming soon, for consistency (e.g. page content fades in the same)
  - See [Motion Config](https://www.framer.com/motion/motion-config/)

### Swiper Carousel

- Swiper.js used to implement carousels across the site, including "Preview" section on homepage, card previews on deck info panels, and study mode.

## Contributing

Post an issue, or respond to an open issue to get started. Feel free to contact the main developer, Mitchell, via [Discord](https://discord.com/users/157610726326927361) if you have any questions.

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

## Work in Progress

ZenDecks is an early-stage work in progress; many features are currently missing or incomplete. Suggestions are welcome in the issues tab, as are contributions!
