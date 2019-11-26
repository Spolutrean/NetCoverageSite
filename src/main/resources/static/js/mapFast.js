ymaps.ready(init);
function init() {
    var map = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [56.185102, 36.977631],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12
    }, {
        restrictMapArea: [[56.1, 36.65], [56.3, 37.35]],
        minZoom: 12,
        maxZoom: 15
    });



    map.events.add('click', function (e) {
        var coords = e.get('coords');
        var body = 'lat=' + coords[0] + '&lng=' + coords[1] + '&z=' + map.getZoom();
        console.log(body);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            map.hint.open(coords, xhr.responseText);
        };
        xhr.open('GET', 'http://45.8.228.45:8090/clickAt?' + body, true);
        xhr.send();
    });

    //7388


    // Шаблон URL для данных активных областей.
    // Источник данных будет запрашивать данные через URL вида:
    // '.../hotspot_layer/hotspot_data/9/tile_x=1&y=2', где
    // x, y - это номер тайла, для которого запрашиваются данные,
    // 9 - значение коэффициента масштабирования карты.
    //var tileUrlTemplate = 'http://45.8.228.45:8090/?triangleCount=50&x=%x&y=%y&z=%z';
    //var keyTemplate = 'tile_%c'; // tile_x_1_y_2_z_9
    // Создадим источник данных слоя активных областей.
    //var objSource = new ymaps.hotspot.ObjectSource(tileUrlTemplate);
    // URL тайлов картиночного слоя.
    // Пример URL после подстановки -
    // '.../tile_z_x_y.png'.
    var imgUrlTemplate = 'http://45.8.228.45:8090/getTile?x=%x&y=%y&z=%z';
    // Создаем картиночный слой и слой активных областей.
    var imgLayer = new ymaps.Layer(imgUrlTemplate, {tileTransparent: true});
    //var hotspotLayer = new ymaps.hotspot.Layer(objSource, {cursor: 'help'});

    // Добавляем слои на карту.
    //map.layers.add(hotspotLayer);
    ymaps.layer.storage.add("imageLayer", imgLayer);
    map.layers.add(imgLayer);

    //var ilayer = ymaps.layer.storage.get("imageLayer");
    //var mmap = ilayer.getMap();
    //var zoom = ilayer.getZoom();
    //var tileNumber = ilayer.clientPixelsToNumber(mmap.getCenter(), zoom);
    //ilayer.getTileUrl(tileNumber, zoom);
}