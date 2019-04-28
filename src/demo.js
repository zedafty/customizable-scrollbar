/*

	demo.js

*/

// =============================================================================
// -----------------------------------------------------------------------------
// # Variables
// -----------------------------------------------------------------------------
// =============================================================================

const demo = {
	"show" : "start"
};

const opts = [
	["theme"             , "N", "string"  , "*"       , "preset of options defined either as run or inline option  (e.g. theme : \"custom\")"                                ],
	["class"             , "T", "string"  , "\"flat\"", "CSS class for both scrollbars (if multiple then use \"class1 class2 class3\" syntax - no colon, no comma)"          ],
	["class_vertical"    , "T", "string"  , "null"    , "CSS class for vertical scrollbar (if multiple then use \"class1 class2 class3\" syntax - no colon, no comma)"       ],
	["class_horizontal"  , "T", "string"  , "null"    , "CSS class for horizontal scrollbar (if multiple then use \"class1 class2 class3\" syntax - no colon, no comma)"     ],
	["class_wrapper"     , "T", "string"  , "null"    , "CSS class for outer wrapper (if multiple then use \"class1 class2 class3\" syntax - no colon, no comma)"            ],
	["wrapper"           , "C", "boolean" , "false"   , "create outer wrapper for container"                                                                                 ],
	["window_bar"        , "N", "boolean" , "*"       , "container scrollbars behave like window scollbars"                                                                  ],
	["smooth_scrolling"  , "E", "boolean" , "false"   , "activate browser smooth scrolling"                                                                                  ],
	["top_side"          , "S", "boolean" , "false"   , "display horizontal scrollbar at top of container"                                                                   ],
	["left_side"         , "S", "boolean" , "false"   , "display vertical scrollbar at left of container"                                                                    ],
	["expand_box"        , "S", "boolean" , "false"   , "container expanded while content preserved"                                                                         ],
	["outside_box"       , "S", "boolean" , "false"   , "scrollbar displayed outside of container"                                                                           ],
	["show_grip"         , "S", "boolean" , "true"    , "thumb grip is shown"                                                                                                ],
	["show_track"        , "S", "boolean" , "true"    , "scrollbar track is shown"                                                                                           ],
	["show_buttons"      , "S", "boolean" , "true"    , "scrollbar buttons are shown"                                                                                        ],
	["show_vertical"     , "S", "boolean" , "true"    , "vertical scrollbar is shown"                                                                                        ],
	["show_horizontal"   , "S", "boolean" , "true"    , "horizontal scrollbar is shown"                                                                                      ],
	["hide_unscrollable" , "S", "boolean" , "true"    , "scrollbars are hidden if container isn't scrollable"                                                                ],
	["thumb_margin"      , "S", "integer" , "0"       , "number of pixels left blank between thumb and track"                                                                ],
	["thumb_min_length"  , "S", "integer" , "6"       , "minimal length of thumb in pixels"                                                                                  ],
	["thumb_grip_length" , "S", "integer" , "20"      , "thumb length in pixels required for grip to be shown"                                                               ],
	["row_height"        , "S", "integer" , "18"      , "number of pixels scrolled vertically per row scroll (mouse wheel, buttons click and key up/down press)"             ],
	["row_width"         , "S", "integer" , "27"      , "number of pixels scrolled horizontally per row scroll (mouse wheel, buttons click and key up/down press)"           ],
	["row_wheel"         , "S", "integer" , "5"       , "number of rows scrolled per wheel impulse"                                                                          ],
	["delay_row"         , "G", "integer" , "20"      , "time interval between two scroll row auto-fires (milliseconds)"                                                     ],
	["delay_page"        , "G", "integer" , "60"      , "time interval between two scroll page auto-fires (milliseconds)"                                                    ],
	["delay_track"       , "G", "integer" , "150"     , "time elapsed before triggering auto-fire when pressing track (milliseconds)"                                        ],
	["delay_button"      , "G", "integer" , "300"     , "time elapsed before triggering auto-fire when pressing buttons (milliseconds)"                                      ],
	["delay_select"      , "G", "integer" , "10"      , "time interval between two auto-scrolling by selection triggers (milliseconds)"                                      ],
	["delay_resize"      , "G", "integer" , "25"      , "time elapsed between two container resize triggers (milliseconds)"                                                  ],
	["select_max"        , "G", "integer" , "20"      , "maximum number of pixels scrolled per auto-scrolling by selection trigger"                                          ],
	["select_bound"      , "G", "integer" , "20"      , "distance in pixels from container edges below which the auto-scrolling by selection will start"                     ],
	["select_range"      , "G", "integer" , "10"      , "range of pixels at which the number of pixels auto-scrolled by selection is increased"                              ],
	["snap_at_bounds"    , "G", "boolean" , "true"    , "scrollbar sticks to edges when track is clicked"                                                                    ],
	["snap_threshold"    , "G", "integer" , "10"      , "number of pixels below which the scrollbar will become sticky"                                                      ],
	["reset_at_limits"   , "G", "boolean" , "true"    , "reset scroll position when cursor moved far away"                                                                   ],
	["reset_threshold"   , "G", "integer" , "200"     , "number of pixels above which the scroll position is reset (either positive or negative)"                            ],
	["reverse_wheel_y"   , "G", "boolean" , "false"   , "wheel up vertical scrollbar to the bottom, wheel down to the top"                                                   ],
	["reverse_wheel_x"   , "G", "boolean" , "false"   , "wheel up horizontal scrollbar to the right, wheel down to the left"                                                 ]
];

/**

	o - perator
	m - arks
	i - nteger
	s - tring

	* - HTML
	q - omment
	t - ag
	a - ttribute

	* - JS
	k - eyword
	r - eserved
	c - ustom

*/

const ptxt = {
	o : ["="],
	m : ["\\(", "\\)", "\\{", "\\}"],
	i : ["\\d+"],
	s : ["\"[^\"]+\""],
	q : ["&lt;!--[^-]*--&gt"],
	t : ["&lt;/?[^!][a-z_-]*", "&gt;/?[a-z_-]*"],
	a : ["src", "href", "rel", "data-scrollbar"],
	k : ["document", "window", "null"],
	r : ["let", "true", "false", "function", "forEach"],
	c : ["Scrollbar"]
};

// =============================================================================
// -----------------------------------------------------------------------------
// # Functions
// -----------------------------------------------------------------------------
// =============================================================================

function colorizePreformattedText(e) { // e = DOM element
	let s = e.innerHTML;
	let a = ptxt, b, i, j;
	for (i in a) {
		b = a[i];
		for (j in b) {
			r = new RegExp("(" + b[j] + ")", "g");
			s = s.replace(r, "<var class='" + i + "'>$1</var>");
		}
	} e.innerHTML = s;
}

function createOptionsTable() {
	// * Create table
	let l = opts, i, j, v;
	let tr, td, tb = document.createElement("tbody");
	for (i = 0; i < l.length; i++) {
		tr = document.createElement("tr");
		for (j = 0; j < l[i].length; j++) {
			td = document.createElement("td");
			v = l[i][j];
			if (j == 0) { // option column
				td.innerHTML = "<strong>" + v + "</strong>";
			} else if (j == 1) { // flag column
				if (v == "N") td.innerHTML = "<small class='flag careful'>No global</small>";
				else if (v == "E") td.innerHTML = "<small class='flag warning'>Experimental</small>";
				else if (v == "G") td.innerHTML = "<small class='flag'>Global</small>";
			} else td.innerHTML = v;
			tr.appendChild(td);
			if (j == 3) colorizePreformattedText(td) // default column
		} tb.appendChild(tr);
	}
	// * Append table
	let options = document.getElementById("options");
	let content = options.querySelector(".content");
	let table = options.querySelector("table");
	table.appendChild(tb);
	// * Resize options
	options.style.height = (content.offsetHeight + 200) + "px";
}

function addScrollbarSnippet(o) { // o = DOM element
	if (o.hasAttribute("data-scrollbar")) {
		let q = o.querySelector("code");
		if (q != null) {
			let h = document.createElement("hr");
			let u = document.createElement("pre");
			let s = "&lt;div data-scrollbar";
			let r = o.getAttribute("data-scrollbar");
			if (r != "") s += "=\"" + r + "\"";
			s += "&gt;";
			u.innerHTML = s;
			q.insertAdjacentElement("afterend", u);
			q.insertAdjacentElement("afterend", h);
		}
	}
}

function restartAnimation(o) { // o = menu element
	let u = o.querySelector("svg");
	let s = u.style.animationName;
	if (s != "") {
		u.style.animationName = s.slice(0, -1) + (s.substr(-1) == "1" ? "2" : "1");
		u.style.animationPlayState = "running";
	}
}

function initializeScrollbar(q) { // q = main element
	q.querySelectorAll("[data-scrollbar]").forEach(function(o) {
		Scrollbar.initialize(o);
	});
}

function checkInitialization(q) { // q = main element
	if (!q.hasAttribute("data-initialized")) {
		// * Initialize scrollbar
		initializeScrollbar(q);
		// * Create options table
		if (q.id == "options") createOptionsTable();
		// * Colorize preformatted text
		q.querySelectorAll("pre").forEach(function(e) {
			colorizePreformattedText(e)
		});
		// * Set initialized
		q.dataset.initialized = "true";
	}
}

function hideMainItems() {
	document.getElementsByTagName("main")[0].querySelectorAll(".pane").forEach(function(o) {
		o.style.display = "none";
	});
}

function hideMenuItems() {
	document.getElementById("menu").querySelectorAll("button").forEach(function(o) {
		o.removeAttribute("disabled");
	});
}

function showMainItem(o) { // o = menu element
	let s = o.getAttribute("data-show");
	if (s != null) {
		let q = document.getElementById(s);
		if (q != null) {
			q.style.display = "";
			checkInitialization(q);
		}
	}
}

function showMenuItem() {
	hideMenuItems();
	this.setAttribute("disabled", "true");
	restartAnimation(this);
	hideMainItems();
	showMainItem(this);
}

// =============================================================================
// -----------------------------------------------------------------------------
// # Events
// -----------------------------------------------------------------------------
// =============================================================================

window.addEventListener("load", function() {

	// 1. Define custom theme
	// Scrollbar.themes.custom = {
		// "class" : "custom",
		// outside_box : true,
		// row_height : 54
	// };

	// 2. Set default options
	// Scrollbar.conf.class = "default";
	// Scrollbar.conf.outside_box = true;
	// Scrollbar.conf.row_height = 54;

	// 3. Start module
	Scrollbar.start(false, null, false);

	// 4. Create scrollbars
	document.querySelectorAll("[data-scrollbar]").forEach(function(element) {

		// A. Set run options
		let options = {
			// "class" : "run",
			// outside_box : true,
			// row_height : 54
		};

		// B. Create elements
		Scrollbar.create(element, options, false);

		// C. Add samples (demo only)
		addScrollbarSnippet(element);

	});

	// 5. Setup menu (demo only)
	document.getElementById("menu").querySelectorAll("button").forEach(function(o) {
		if (o.getAttribute("data-show") == demo.show) { showMainItem(o); o.setAttribute("disabled", "true"); }
		o.addEventListener("click", showMenuItem);
	});

	// 6. Setup current pane (demo only)
	let a = document.getElementsByTagName("main")[0].querySelectorAll(".pane"), i;
	for (i = 0; i < a.length; i++) {
		if (a[i].style.display != "none") checkInitialization(a[i]);
	}
	
	// 7. Set version (demo only)
	document.getElementById("version").innerText = Scrollbar.version;

});

