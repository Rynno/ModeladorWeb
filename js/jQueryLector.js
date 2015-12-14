$(document).ready(function () {
    //$("#btnFuente").click(function () {
        $.ajax({
            type: "GET",
            url: "rss/matter.xml",
            dataType: "xml",
            success: function (data) {
              divSvg.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
            }
        });
    //});
});

