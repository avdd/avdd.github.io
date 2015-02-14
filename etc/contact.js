
this.initContactForm = (function(){

    'use strict';

    var X  = {};
        
    return init;

    function init(form, url) {
        if (!form)
            return;
        window.S = gotConfig;
        window.R = gotResponse;
        X.url = url;
        X.form = form;
        X.container = form.parentNode;
        X.className = X.container.className;
        script(url + '?f=S');
    }

    function gotConfig(data) {

        X.session = data.session;
        X.timeout = data.timeout;
        X.wait = data.wait;

        var f = X.form;

        X.expire = f.getElementsByTagName('small')[0];
        X.notice = f.getElementsByTagName('span')[0];
        X.send = f.submit.innerHTML;

        f.className = 'waiting';
        f.style.display = 'block';
        f.message.focus();
        f.onsubmit = function () {
            onsubmit(f);
            return false;
        };
        countdown();
    }

    function setClass(x) {
        X.container.className = X.className + ' ' + x;
    }

    function countdown() {
        var f = X.form, s = f.submit;
        if (f.className == 'waiting') {
            if (--X.wait > 0) {
                s.innerHTML = ' - ' + X.wait + ' -';
            }
            else {
                s.innerHTML = X.send;
                f.className = 'enabled';
                notice('');
            }
        }

        var mm = Math.floor(X.timeout / 60),
            ss = X.timeout % 60,
            mmss = '' + mm + ':' + (ss < 10 ? '0' : '') + ss;

        if (X.timeout--) {
            X.expire.innerHTML = 'This form will self-destruct in '
                        + '<code>' + mmss + '</code>';
            setTimeout(countdown, 1000);
        }
        else {
            f.onsubmit = function(){return false};
            f.className += ' expired';
            s.style.display = 'none';
            X.expire.innerHTML = ('Expired. Refresh to start again');
            notice('Expired');
        }
    }

    function notice(x) {
        X.notice.innerHTML = x;
    }

    function onsubmit(f) {
        if (!f.message.value) {
            notice('Please write something!');
            return;
        }

        if (!f.name.value) {
            notice('Please include a name!');
            return;
        }

        if (X.wait) {
            notice('Wait ...');
            return;
        }

        f.onsubmit = function () { return false; };
        f.className = 'submitted';
        f.submit.innerHTML = '...';
        notice('Sending');

        setTimeout(function() {
            script(X.url + '?f=R'
                    + '&i=' + X.session
                    + '&n=' + encodeURIComponent(f.name.value)
                    + '&c=' + encodeURIComponent(f.contact.value)
                    + '&m=' + encodeURIComponent(f.message.value));
        },5);
    }

    function script(url) {
        var s = document.createElement('SCRIPT');
        s.src = url;
        s.async = true;
        document.body.appendChild(s);
    }

    function replace(msg) {
        X.container.innerHTML = '<p>' + msg;
    }

    function gotResponse(data) {
        if (data == 'ok')
            X.form.className = 'responded';
    }

})();

