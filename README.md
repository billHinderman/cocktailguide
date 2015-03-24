# The Cocktail Guide : Font End

## Components:

### Recipe
* ID
* Name
* --Occasion(s) List--
* --Photo(s) List--
* --Recipe Ingredient(s) List--
* --Spirit(s) List--  
* Glass
* Time
* --Steps list--
* --Sharing links list--
* Blurb
* Social blurb


### Recipe Ingredient
* --Ingredient--
* --Measure--

### Ingredient
* ID
* Name
* Proof
* Base measure
* Calories per [base measure]
* Color

### Measure
* Name
* Type (for conversion?)  

### Photo
* Src
* Size
* Author

### Occasion
* ID
* Name
* Description

### Spirit
* ID
* Name
* Description

### Step
* Content

### Sharing link
* Link
* Name
* Alt
* Display text/icon



## Backbone models:

* RecipesList
* Recipe

* RecipeIngredientsList
* RecipeIngredient

* Ingredient

* Measure

* OccasionsList
* Occasion

* SpiritsList
* Spirit

* StepsList
* Step

* SharingLinksList
* SharingLink
