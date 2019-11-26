ymaps.ready(init);
function init(){
    var map = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [59.94, 30.32],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 7
    });

    var remoteObjectManager = new ymaps.RemoteObjectManager('http://45.8.228.45:8090/?triangleCount=50&x=%x&y=%y&z=%z', {
        splitRequests: true
    });
    map.geoObjects.add(remoteObjectManager);
}