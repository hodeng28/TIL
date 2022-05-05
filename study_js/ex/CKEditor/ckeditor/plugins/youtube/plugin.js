/*
 * Youtube Embed Plugin
 *
 * @author Jonnas Fonini <jonnasfonini@gmail.com>
 * @version 2.1.18
 */
(function () {
  CKEDITOR.plugins.add("youtube", {
    lang: [
      "en",
      "bg",
      "pt",
      "pt-br",
      "ja",
      "hu",
      "it",
      "fr",
      "tr",
      "ru",
      "de",
      "ar",
      "nl",
      "pl",
      "vi",
      "zh",
      "el",
      "he",
      "es",
      "nb",
      "nn",
      "fi",
      "et",
      "sk",
      "cs",
      "ko",
      "eu",
      "uk",
    ],
    init: function (editor) {
      editor.addCommand(
        "youtube",
        new CKEDITOR.dialogCommand("youtube", {
          allowedContent:
            "div{*}(*); iframe{*}[!width,!height,!src,!frameborder,!allowfullscreen,!allow]; object param[*]; a[*]; img[*]",
        })
      );

      editor.ui.addButton("Youtube", {
        label: editor.lang.youtube.button,
        toolbar: "insert",
        command: "youtube",
        icon: this.path + "images/youtube_icon.png",
      });

      CKEDITOR.dialog.add("youtube", function (instance) {
        var video;

        function handleLinkChange(el, api) {
          var video = ytVidId(el.getValue());
          var time = ytVidTime(el.getValue());

          if (video && time) {
            var seconds = timeParamToSeconds(time);
            var hms = secondsToHms(seconds);
            el.getDialog()
              .getContentElement("youtubePlugin")
              .setValue(hms);
          }
        }
        return {
          title: editor.lang.youtube.title,
          minWidth: 320,
          minHeight: 50,
          contents: [
            {
              id: "youtubePlugin",
              expand: true,
              elements: [
                {
                  type: "hbox",
                  widths: ["85%", "15%"],
                  children: [
                    // 유튜브 주소 입력창
                    {
                      id: "txtUrl",
                      type: "text",
                      label: editor.lang.youtube.txtUrl,
                      onChange: function (api) {
                        handleLinkChange(this, api);
                      },
                      onKeyUp: function (api) {
                        handleLinkChange(this, api);
                      },
                      validate: function () {
                        if (this.isEnabled()) {
                          if (!this.getValue()) {
                            alert(editor.lang.youtube.noCode);
                            return false;
                          } else {
                            video = ytVidId(this.getValue());

                            if (
                              this.getValue().length === 0 ||
                              video === false
                            ) {
                              alert(editor.lang.youtube.invalidUrl);
                              return false;
                            }
                          }
                        }
                      },
                    },
                    // 유튜브 width 입력창

                    {
                      type: "text",
                      id: "txtWidth",
                      width: "60px",
                      label: editor.lang.youtube.txtWidth,
                      default:
                        editor.config.youtube_width != null
                          ? editor.config.youtube_width
                          : "640",
                      validate: function () {
                        if (this.getValue()) {
                          var width = Number(this.getValue());

                          if (isNaN(width)) {
                            alert(editor.lang.youtube.invalidWidth);
                            return false;
                          }
                        } else {
                          alert(editor.lang.youtube.noWidth);
                          return false;
                        }
                      },
                    },
                  ],
                },
              ],
            },
          ],
          onOk: function () {
            var content = "";
            var url = "https://",
              params = [],
              startSecs,
              paramAutoplay = "";
            var width = this.getValueOf("youtubePlugin", "txtWidth");
            var height = width * 9 / 16;

            url += "www.youtube.com/";
            url += "embed/" + video;

            startSecs = this.getValueOf("youtubePlugin");

            if (startSecs) {
              var seconds = hmsToSeconds(startSecs);
              params.push("start=" + seconds);
            }

            if (params.length > 0) {
              url = url + "?" + params.join("&");
            }

            content +=
              "<iframe " +
              (paramAutoplay ? 'allow="' + paramAutoplay + ';" ' : "") +
              'width="' +
              width +
              '" height="' +
              height +
              '" src="' +
              url +
              '" ' +
              'frameborder="0" allowfullscreen style="max-width: 100%"></iframe>';

            var element = CKEDITOR.dom.element.createFromHtml(content);
            var instance = this.getParentEditor();
            instance.insertElement(element);
          },
        };
      });
    },
  });
})();

/**
 * JavaScript function to match (and return) the video Id
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: http://stackoverflow.com/a/10315969/624466
 */
function ytVidId(url) {
  var p = /^(?:https?:\/\/)?(?:(?:www|m).)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? RegExp.$1 : false;
}

/**
 * Matches and returns time param in YouTube Urls.
 */
function ytVidTime(url) {
  var p = /t=([0-9hms]+)/;
  return url.match(p) ? RegExp.$1 : false;
}

/**
 * Converts time in hms format to seconds only
 */
function hmsToSeconds(time) {
  var arr = time.split(":"),
    s = 0,
    m = 1;

  while (arr.length > 0) {
    s += m * parseInt(arr.pop(), 10);
    m *= 60;
  }

  return s;
}

/**
 * Converts seconds to hms format
 */
function secondsToHms(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds / 60) % 60);
  var s = seconds % 60;

  var pad = function (n) {
    n = String(n);
    return n.length >= 2 ? n : "0" + n;
  };

  if (h > 0) {
    return pad(h) + ":" + pad(m) + ":" + pad(s);
  } else {
    return pad(m) + ":" + pad(s);
  }
}

/**
 * Converts time in youtube t-param format to seconds
 */
function timeParamToSeconds(param) {
  var componentValue = function (si) {
    var regex = new RegExp("(\\d+)" + si);
    return param.match(regex) ? parseInt(RegExp.$1, 10) : 0;
  };

  return (
    componentValue("h") * 3600 + componentValue("m") * 60 + componentValue("s")
  );
}

/**
 * Converts seconds into youtube t-param value, e.g. 1h4m30s
 */
function secondsToTimeParam(seconds) {
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds / 60) % 60);
  var s = seconds % 60;
  var param = "";

  if (h > 0) {
    param += h + "h";
  }

  if (m > 0) {
    param += m + "m";
  }

  if (s > 0) {
    param += s + "s";
  }

  return param;
}
