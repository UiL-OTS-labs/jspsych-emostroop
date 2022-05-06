
// Keeps track whether or not consent has been given.
let consent_given = false;

/*
 * This fragment of html will be displayed in the beginning of you experiment.
 * You should fillout the contents of your information letter here.
 * It is displayed as html, the current html should be replace with
 * your information letter.
 */
const CONSENT_HTML = 
    '<p>' +
        'Insert your information letter here; for more information, see the '  +
        '<a href="https://fetc-gw.wp.hum.uu.nl/en/" target="_blank"> '         +
            'FEtC-H website'                                                   +
        '</a>'                                                                 +
    '</p>';

/*
 * Debrieving given when the participant doesn't consent.
 */
const DEBRIEF_MESSAGE_NO_CONSENT = 
    "<h1>"                                          +
        "End of the experiment"                     +
    "</h1>"                                         +
    "<h2>"                                          +
        "No consent has been given."                +
    "</h2>";

const CONSENT_STATEMENT = 
    'Yes, I consent to the use of my answers for scientific research.';

const CONSENT_REFERENCE_NAME = 'consent';
const IF_REQUIRED_FEEDBACK_MESSAGE = 
    "You must check the box next to " + CONSENT_STATEMENT +
    "in order to proceed to the experiment.";


// displays the informed consent page
let consent_block = {
    type: jsPsychSurveyMultiSelect,
    data : {uil_save : true},
    preamble: CONSENT_HTML,
    required_message: IF_REQUIRED_FEEDBACK_MESSAGE,
    questions: [
        {
            prompt: "", 
            options: [CONSENT_STATEMENT], 
            horizontal: true,
            required: false,  
            button_label: CONTINUE_BUTTON_TEXT,
            name: CONSENT_REFERENCE_NAME
        }
    ],
    on_finish: function(data) {
        let consent_choice = data.response;   
        data.consent_choice_response = consent_choice;
    }
};


// Is displayed when no consent has been given.
let no_consent_end_screen = {
    type: 'html-button-response',
    type: jsPsychHtmlButtonResponse,
    stimulus: DEBRIEF_MESSAGE_NO_CONSENT,
    choices: [],
    trial_duration: FINISH_TEXT_DUR,
    on_finish: function (data){
        jsPsych.endExperiment()
    }
};

// Tests wheter consent has been given.
// If no consent has been given, it displays the
// no_consent_screen and finishes the experiment asap.
//
let if_node_consent = {
    timeline: [no_consent_end_screen],
    conditional_function: function(data) {
        /**
         * Whether or not the participant gave consent.
         *
         * @returns {bool}
         */
        function ppGaveConsent()
        {
            let data = jsPsych.data.get();
            let consent_trial = data.trials[data.trials.length - 1]
            console.assert(consent_trial.trial_type === 'survey-multi-select');
            return consent_trial.response.consent.includes(CONSENT_STATEMENT);
        }

        let agreed_with_consent = ppGaveConsent();
        if (agreed_with_consent) {
            consent_given = true;
            return false;
        } else {
            return true;
        }
    }
}

let consent_procedure = {
    timeline: [consent_block, if_node_consent]
}

