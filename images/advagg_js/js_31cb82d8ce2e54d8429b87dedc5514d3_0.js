/* Source and licensing information for the line(s) below can be found at http://www.animecenter.tv/misc/progress.js. */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
    var pb = this;
    this.id = id;
    this.method = method || "GET";
    this.updateCallback = updateCallback;
    this.errorCallback = errorCallback;
    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'progress';
    $(this.element).html('<div class="bar"><div class="filled"></div></div><div class="percentage"></div><div class="message">&nbsp;</div>')
};
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
    if (percentage >= 0 && percentage <= 100) {
        $('div.filled', this.element).css('width', percentage + '%');
        $('div.percentage', this.element).html(percentage + '%')
    }
    ;
    $('div.message', this.element).html(message);
    if (this.updateCallback)this.updateCallback(percentage, message, this)
};
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
    this.delay = delay;
    this.uri = uri;
    this.sendPing()
};
Drupal.progressBar.prototype.stopMonitoring = function () {
    clearTimeout(this.timer);
    this.uri = null
};
Drupal.progressBar.prototype.sendPing = function () {
    if (this.timer)clearTimeout(this.timer);
    if (this.uri) {
        var pb = this;
        $.ajax({
            type: this.method, url: this.uri, data: '', dataType: 'json', success: function (progress) {
                if (progress.status == 0) {
                    pb.displayError(progress.data);
                    return
                }
                ;
                pb.setProgress(progress.percentage, progress.message);
                pb.timer = setTimeout(function () {
                    pb.sendPing()
                }, pb.delay)
            }, error: function (xmlhttp) {
                pb.displayError(Drupal.ahahError(xmlhttp, pb.uri))
            }
        })
    }
};
Drupal.progressBar.prototype.displayError = function (string) {
    var error = document.createElement('div');
    error.className = 'error';
    error.innerHTML = string;
    $(this.element).before(error).hide();
    if (this.errorCallback)this.errorCallback(this)
};
/* Source and licensing information for the above line(s) can be found at http://www.animecenter.tv/misc/progress.js. */
