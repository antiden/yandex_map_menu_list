ymaps.ready(init);
var yaMap, myPlacemark;

function init(){
    yaMap = new ymaps.Map("map", {
        center: [55.781068, 49.213171],
        zoom: 12,
        controls: ['geolocationControl', 'trafficControl', 'typeSelector', 'fullscreenControl', 'zoomControl', 'routeButtonControl']
    });

    function places( place ) {
        for ( var i = 0; i < place.length; i++ ) {

            var lng = Number(place[i].dataset.lng);
            var lat = Number(place[i].dataset.lat);
            var name = place[i].dataset.name;
            var adress = place[i].dataset.adress;
            var ico = place[i].dataset.ico;

            if (ico == '') {
                var icon = {
                    preset: 'twirl#blueStretchyIcon'
                }
            } else {
                var icon = {
                    iconLayout: 'default#image',
                    iconImageHref: ico,
                    iconImageSize: [100, 100],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-50, -95]
                }
            }

            var myPlacemark = new ymaps.Placemark(
                [lng, lat],
                {
                    iconContent: '',
                    balloonContentHeader: name,
                    balloonContentBody: adress
                }, icon
            );
            yaMap.geoObjects.add(myPlacemark);

            var mapAddress = document.querySelectorAll('.js-address');

            mapAddress.forEach(function(el) {
                el.addEventListener("click", function (e) {
                    lng = Number(e.target.dataset.lng);
                    lat = Number(e.target.dataset.lat);
                    name = e.target.dataset.name;
                    adress = e.target.dataset.adress;
                    //myPlacemark.geometry.setCoordinates([lng, lat]);
                    mapAddress.forEach(el => {
                        el.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    yaMap.setCenter(myPlacemark.geometry.getCoordinates());
                    yaMap.balloon.close();
                    myPlacemark = new ymaps.Placemark(
                        [lng, lat],
                        {
                            iconContent: '',
                            balloonContentHeader: name,
                            balloonContentBody: adress
                        }, icon
                    );
                    yaMap.geoObjects.add(myPlacemark);
                });
            });
        }
    }

    var markers = document.querySelectorAll(".marker");

    places(markers);
    yaMap.behaviors.disable('scrollZoom');

    /*Центрируем карту по маркерам*/
    centerMap();
}

function centerMap () {
    yaMap.setBounds(
    yaMap.geoObjects.getBounds(), {
        checkZoomRange:true
    })
    .then(
        function(){
            if(yaMap.getZoom() > 16) {
                yaMap.setZoom(16)
            }
        }
    );
}

var resetButton = document.querySelector('.reset');

function reset() {
    centerMap();
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        reset();
    });
}