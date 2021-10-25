// Item types
const PRACTICE      = "PRACTICE";
const CONGRUENT     = "CONGRUENT";
const INCONGRUENT   = "INCONGRUENT";

const PLUGIN_NAME   = "html-keyboard-response";

// Lists 
const LISTS = [
    "list1",
    "list2"
    // "list3"
];

// colors
const RED = "red";
const GREEN = "green";
const YELLOW = "yellow";
const BLUE = "blue";

const PRACTICE_ITEMS = [
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
    }
];

// Add a third list of stimuli when required.
// const LIST_GROUP3 = [
// ...
// ]

// These lists are not a between subjects variable, but
// define which list a participant gets.
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

