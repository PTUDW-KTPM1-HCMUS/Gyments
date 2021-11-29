var paginate = {
    // (A) DRAW () : INIT + ATTACH PAGINATION
    // opt : options
    //  target : ID of <div>, where to generate pagination.
    //  total : total number of pages.
    //  click : URL string or function to call on click.
    //  current : (optional) current page, default 1.
    //  adj : (optional) num of adjacent pages beside "current page", default 2.
    wrap : null,
    draw : function (opt) {
        // (A1) INITIATE PAGINATION
        paginate.wrap = document.getElementById(opt.target);
        paginate.wrap.innerHTML = "";
        paginate.wrap.classList.add("paginate");
        if (opt.current === undefined) { opt.current = 1; }
        if (opt.adj === undefined) { opt.adj = 2; }
        if (opt.adj <= 0) { opt.adj = 1; }
        if (opt.current <= 0) { opt.current = 1; }
        if (opt.current > opt.total) { opt.current = opt.total; }
        let temp;

        // (A2) URL STRING
        let jsmode = true; // click on pagination squares will be handled by JS?
        if (typeof opt.click == "string") {
            jsmode = false;
            if (opt.click.indexOf("?") == -1) { opt.click += "?pg="; }
            else { opt.click += "&pg="; }
        }

        // (A3) BACK TO FIRST PAGE (DRAW ONLY IF SUFFICIENT SQUARES)
        if (opt.current - opt.adj > 1) {
            paginate.square("&#10218;", 1, jsmode, opt.click, "first");
        }

        // (A4) ADJACENT SQUARES BEFORE CURRENT PAGE
        if (opt.current > 1) {
            temp = opt.current - opt.adj;
            if (temp<=0) { temp = 1; }
            for (let i=temp; i<opt.current; i++) {
                paginate.square(i, i, jsmode, opt.click);
            }
        }

        // (A5) CURRENT PAGE
        paginate.square(opt.current, opt.current, jsmode, opt.click, "current");

        // (A6) ADJACENT SQUARES AFTER CURRENT PAGE
        if (opt.current < opt.total) {
            temp = opt.current + opt.adj;
            if (temp > opt.total) { temp = opt.total; }
            for (let i=opt.current+1; i<=temp; i++) {
                paginate.square(i, i, jsmode, opt.click);
            }
        }

        // (A6) SKIP TO LAST PAGE (DRAW ONLY IF SUFFICIENT SQUARES)
        if (opt.current <= opt.total - opt.adj - 1) {
            paginate.square("&#10219;", opt.total, jsmode, opt.click, "last");
        }
    },

    // (B) SQUARE () : HELPER - GENERATE PAGINATION SQUARE
    // txt : text to show in the pagination square
    // pg : page number
    // jsmode : true (click must be a function), false (click must be URL)
    // click : onclick action (url or function)
    // css : (optional) css class of pagination square
    square : function (txt, pg, jsmode, click, css) {
        let el = document.createElement("a");
        el.innerHTML = txt;
        if (css) { el.className = css; }
        if (jsmode) { el.onclick = function(){ click(pg); }; }
        else { el.href = click + pg; }
        paginate.wrap.appendChild(el);
    }
};
