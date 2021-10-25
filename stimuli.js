// Item types
const PRACTICE      = "PRACTICE";
const CONGRUENT     = "CONGRUENT";
const INCONGRUENT   = "INCONGRUENT";
const NEUTRAL       = "NEUTRAL";
const EMOTIONAL     = "EMOTIONAL";

const PLUGIN_NAME   = "html-keyboard-response";

// colors
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";
const BLUE = "blue";

// Lists
// Add more lists here when necessary.
// remember to add an extra LIST_GROUPx array below
// to describe the stimuli for this list. You might
// also remove list2 for example to just use 1 list.
// also add this list to the TEST_ITEMS array below.
const LISTS = [
    "list1",
    "list2"
    // "list3"
];

const PRACTICE_ITEMS = [
    {
        id : 1,
        item_type : PRACTICE, // CONGRUENT
        word : "red",
        color : RED
    },
    {
        id : 2,
        item_type : PRACTICE, // INCONGRUENT
        word : "red",
        color : BLUE 
    },
    {
        id : 3,
        item_type : PRACTICE, // CONGRUENT
        word : "green",
        color : GREEN,
    },
    {
        id : 4,
        item_type : PRACTICE, // INCONGRUENT
        word : "red",
        color : YELLOW
    },
    {
        id : 5,
        item_type : PRACTICE, // NEUTRAL
        word : "book",
        color : GREEN
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        word : "sad",
        color : BLUE
    }

];

/*
 * In this list there is a stimulus, if a word or group of words starts with a
 * '#' it's reaction time will be recorded. So don't put any '#" elsewhere...
 */
const LIST_GROUP1 = [
    {
        id : 1,
        item_type : CONGRUENT,
        word : "red",
        color : RED
    },
    {
        id : 2,
        item_type : INCONGRUENT,
        word : "red",
        color : BLUE 
    },
    {
        id : 3,
        item_type : CONGRUENT,
        word : "green",
        color : GREEN,
    },
    {
        id : 4,
        item_type : INCONGRUENT,
        word : "red",
        color : YELLOW
    },
    {
        id : 5,
        item_type : NEUTRAL,
        word : "fork",
        color : GREEN
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        word : "tear",
        color : BLUE
    }
];

/*
 * In this list there is a stimulus, if a word starts with a '#' its
 * reaction time will be recorded. So don't put any '#" elsewhere...
 */
const LIST_GROUP2 = [
    {
        id : 1,
        item_type : INCONGRUENT,
        word : "red",
        color : BLUE, 
    },
    {
        id : 2,
        item_type : CONGRUENT,
        word : "red",
        color : RED 
    },
    {
        id : 3,
        item_type : INCONGRUENT,
        word : "green",
        color : RED,
    },
    {
        id : 4,
        item_type : CONGRUENT,
        word : "yellow",
        color : YELLOW
    },
    {
        id : 5,
        item_type : NEUTRAL,
        word : "fork",
        color : YELLOW
    },
    {
        id : 6,
        item_type : EMOTIONAL,
        word : "tear",
        color : RED
    }
];

// Add a third list of stimuli when required.
// const LIST_GROUP3 = [
// ...
// ]

// This list can be use as a between subject variable
// e.g. GROUP1 gets a manipulation not present in
// GROUP2, these groups may also be used to create
// a latin square design
const TEST_ITEMS = [
    {list_name: LISTS[0], table: LIST_GROUP1},
    {list_name: LISTS[1], table: LIST_GROUP2}
    // Add a third list here, put a comma on the
    // end of the line above here.
    // {list_name: LISTS[1], table: LIST_GROUP3}
];

/**
 * Get the list of practice items
 *
 * Returns an object with a list and a table, the list will always indicate
 * "practice" since it are the practice items
 *
 * @returns {object} object with list_name and table fields
 */
function getPracticeItems() {
    return {list_name : "practice", table : PRACTICE_ITEMS};
}

/**
 * This function will pick a random list from the TEST_ITEMS array.
 *
 * Returns an object with a list and a table, the list will always indicate
 * which list has been chosen for the participant.
 *
 * @returns {object} object with list_name and table fields
 */
function pickRandomList() {
    let range = function (n) {
        let empty_array = [];
        let i;
        for (i = 0; i < n; i++) {
            empty_array.push(i);
        }
        return empty_array;
    }
    let num_lists = TEST_ITEMS.length;
    var shuffled_range = jsPsych.randomization.repeat(range(num_lists), 1)
    var retlist = TEST_ITEMS[shuffled_range[0]];
    return retlist
}

