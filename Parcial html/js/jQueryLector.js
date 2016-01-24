$(document).ready(function () {
    //$("#btnFuente").click(function () {
        $.ajax({
            type: "GET",
            url: "svgmenu/menu.xml",
            dataType: "xml",
            success: function (data) {
              divSvg.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
            }
        });
    //});
});

