$(document).ready(function () {
    $("#btnFuente").click(function () {
        $.ajax({
            type: "GET",
            url: "xml/" + $("#txtFuente").val() + ".xml",
            dataType: "xml",
            success: function (data) {
              divSvg.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
            }
        });
    });
});