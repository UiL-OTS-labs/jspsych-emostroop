
// Keeps track whether or not consent has been given.
let consent_given = false;

/*
 * This fragment of html will be displayed in the beginning of you experiment.
 * You should fillout the contents of your information letter here.
 * It is displayed as html, the current html should be replace with
 * your information letter.
 */
const CONSENT_HTML =
    "<p>" +
    '<b>Welkom bij het online experiment Het Bereden Paard 22-028-03!</b>' +
    "</p>" +
    '<p>'			+
    'Beste lezer,' +
    '</p>'		+
    '<p>'		+
    'Wij, Betül Boz, Marit Schilling, Ronja van Zijverden en Tess Wensink, zijn studenten '	+
    'aan de Universiteit Utrecht en nodigen je uit om deel te nemen aan ons onderzoek, dat '	+
    'wordt uitgevoerd binnen de faculteit Geesteswetenschappen van de Universiteit Utrecht. '	+
    'Dit wordt gedaan in het kader van de cursus Experimental Design and Data Analysis onder toezicht '	+
    'van dr. Iris Mulders, cursuscoördinator.' +
    '</p>'	+
    '<p>'	+
    '<b> 1.	Hoe wordt dit onderzoek uitgevoerd? </b>' +
    '</p>'	+
    '<p>'			+
    'Dit is een anoniem wetenschappelijk onderzoek dat online wordt uitgevoerd. ' +
    'Bij het onderzoek wordt je gevraagd om in stilte zinnen te lezen. Hierbij zal '  +
    'je leestijd worden gemeten. Voorafgaand aan het experiment zal gevraagd worden '  +
    'naar persoonlijke gegevens, verder gespecificeerd onder sectie 3 (Databeheer). ' +
    'Na de test worden nog enkele vragen gesteld over het experiment zelf. Het onderzoek ' +
    'duurt in totaal niet meer dan 20 minuten. Het is belangrijk dat je deelneemt aan het ' +
    'onderzoek op een laptop of PC met toetsenbord, omdat het niet goed werkt op een tablet ' +
    'of smartphone. Als je moedertaal niet Nederlands is, je een vorm van autisme, dyslexie ' +
    'of een taalontwikkelingsstoornis (TOS) hebt, dan kun je helaas niet deelnemen aan dit '  +
    'onderzoek. Het experiment wordt dan beëindigd en je gegevens worden niet opgeslagen.' +
    '</p>'		+
    '<p>'		+
    '<b>2.	Vrijwillige deelname en anonimiteit</b>' +
    '</p>'		+
    '<p>'		+
    'Deelname aan ons onderzoek is geheel vrijwillig. Alleen als je toestemming geeft, ' +
    'zullen je gegevens worden gebruikt voor ons onderzoek. Gedurende het onderzoek mag ' +
    'je op elk moment stoppen als je van gedachten verandert. Als je stopt, zal de data die ' +
    'tot dan toe is ingevoerd niet opgeslagen worden. De data wordt anoniem verzameld. Je naam, ' +
    'e-mailadres, IP-adres en tijd van afname worden niet geregistreerd.' +
    '</p>'	+
    '<p>'		+
    '<b>3.	Databeheer</b>' +
    '</p>'		+
    '<p>'		+
    'Voor dit experiment zullen we bepaalde gegevens van je gebruiken, namelijk je antwoorden '	+
    'op de vragen die we voor en na het experiment stellen en je resultaten tijdens het experiment. '	+
    'We slaan na het experiment de volgende gegevens op: je geboortemaand, geboortejaar, geslacht, '	+
    'opleidingsniveau, met welke hand je schrijft, het apparaat en het besturingssysteem dat je '	+
    'gebruikt voor het deelnemen aan het experiment, en je responstijden. Verder heb je aangegeven '	+
    'dat je Nederlands als moedertaal hebt en dat je geen dyslexie, TOS of autisme hebt. Deze gegevens ' 	+
    'zijn niet tot jou te herleiden. We zullen alleen meerkeuzevragen stellen. De gegevens zullen '	+
    'minstens tien jaar opgeslagen worden op een beveiligde server van de Universiteit Utrecht, '	+
    'waarbij ze eventueel beschikbaar zullen zijn voor gebruik door andere onderzoekers. Dit zal voor '	+
    'niet-commercieel gebruik zijn.' +
    '</p>'		+
    '<p>'		+
    '<b>4.	Goedkeuring van dit onderzoek</b>' +
    '</p>'		+
    '<p>'		+
    'De Facultaire Ethische Toetsingscommissie - Geesteswetenschappen (FETC-GW) van de Universiteit '	+
    'Utrecht heeft dit onderzoek goedgekeurd. Wanneer je een klacht hebt over de manier waarop dit '	+
    'onderzoek wordt uitgevoerd, dan kun je contact opnemen met de secretaris van de '	+
    'FETC-GW fetc-gw@uu.nl.' +
    '</p>'		+
    '<p>'		+
    '<b>5.	Toestemming</b>' +
    '</p>'		+
    '<p>'		+
    'Als je meer informatie wilt over dit onderzoek, kun je contact opnemen met dr. Iris Mulders '	+
    '(I.C.M.C.Mulders@uu.nl) of Tess Wensink (t.s.b.wensink@uu.nl).' +
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
    `<b>
        Ja, ik heb het bovenstaande gelezen en begrepen, en ik geef
        uitdrukkelijke toestemming om mijn antwoorden (inclusief antwoorden op
        persoonlijke vragen) te gebruiken voor wetenschappelijk onderzoek, zoals
        hierboven beschreven. Als dit vakje niet aan wordt gevinkt, kan je niet
        deelnemen aan het onderzoek.
    </b>`;


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

