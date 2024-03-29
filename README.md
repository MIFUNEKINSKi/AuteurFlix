
![AuteurFlix](/app/assets/images/auteurflix_logo.png)
___
![AuteurFlix](/app/assets/images/readme/AuteurFLix.png)
AuteurFlix is a fully-functioning clone of Netflix, consisting entirely of sleep- and dream-themed movie trailers. It was created using the following: 

* Backend: Rails
* Database: PostrgreSQL
* Frontend: React-Redux
* Hosting: Heroku
* Storage: AWS S3
* Languages: Ruby, Javascript, CSS, HTML

Check out the site [here](http://AuteurFlix.herokuapp.com/). 

## MVP Features
### 1. Profiles
As with Netflix, a  AuteurFlix user can create, edit, and delete profiles, allowing multiple people to share a single 'account' and curate their individual My Lists.

![Adding a new profile](app/assets/images/readme/Add_profile.gif)

### 2. Browse
Upon signing in and selecting a profile, a user is taken to the main movie browse page, on which movies are organized by genre. They can see additional information about each title by hovering over its thumbnail, which also autoplays the associated trailer. From there, the user can play the video in fullscreen, add it to their My List, or click for more information, which opens a larger modal that includes the film's length and summary. 

![Browsing titles](app/assets/images/readme/home_browse.gif)



```javascript
  scrollLeft(e) {
        const lastItem = e.currentTarget.parentElement.lastElementChild.previousElementSibling
        const coord = lastItem.getBoundingClientRect();
        if (window.innerWidth - coord.right >= 20) {
            return false
        } else {
            const leftArrow = document.getElementById('left-arrow');
            const rightArrow = document.getElementById('right-arrow');
            this.setState({xoffset: this.state.xoffset -= this.state.delta});
            this.setState({leftArrow: this.state.leftArrow += this.state.delta});
            this.setState({ rightArrow: this.state.rightArrow -= this.state.delta });
        }
    }
```

### 3. My List
Each profile has a unique My List to help the user keep track of movies they'd like to watch. They can add or delete a given movie from the main browse page or a separate My List page. 

![Adding and removing title from My List](app/assets/images/readme/add_to_my_list.gif)

### 4. Search
A search feature within the navigation bar allows a user to find movies by title, genre, or summary keywords. The search is responsive, with results changing as the user types. 

![Searching for movies](app/assets/images/readme/search.gif)

To allow a user to search by title, genre, or summary keyword required multiple functions, each of which returned an array of matches to be stored in state. In the search component's render method, I merged the results, converted them to a set to ensure unique entries, and then rendered each movie.

```javascript
        const movieSet = new Set(this.state.movieMatches.flat().concat(this.state.genreMatches.flat()));
        const displayMovies = Array.from(movieSet);
        const header = (this.state.searchString.length > 0 && displayMovies.length === 0) ?
            `Your search for '${this.state.searchString}' did not have any matches.` : '';
        const display = displayMovies.length ? displayMovies.map(movie =>
            <MovieDetail
                myList={this.props.myList}
                currentProfileId={this.props.currentProfileId}
                createListItem={this.props.createListItem}
                deleteListItem={this.props.deleteListItem}
                key={movie.id}
                movie={movie}
                tags={this.props.tags}
                genres={this.props.genres}
            />
        ) : null;
```


