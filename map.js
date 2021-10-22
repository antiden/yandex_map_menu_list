ymaps.ready(init);
var yaMap, myPlacemark;

function init(){
    yaMap = new ymaps.Map("map", {
        center: [55.781068, 49.213171],
        zoom: 12,
        controls: ['geolocationControl', 'trafficControl', 'typeSelector', 'fullscreenControl', 'zoomControl', 'routeButtonControl']
    });

    function places( place ) {
        var item = [];
        for ( var i = 0; i < place.length; i++ ) {
            var lng = $(place[i]).data('lng');
            var lat = $(place[i]).data('lat');
            var name = $(place[i]).data('name');
            var adress = $(place[i]).data('adress');
            var ico = $(place[i]).data('ico');

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

            $('.js-address').each(function() {
                var self = $(this);
                self.bind({
                    click: function(name) {
                        lng = self.data('lng');
                        lat = self.data('lat');
                        name = self.data('name');
                        adress = self.data('adress');
                        //myPlacemark.geometry.setCoordinates([lng, lat]);
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
                        
                    }
                })
            });
        }
    }

    places($(".marker").toArray().reverse());
    yaMap.behaviors.disable('scrollZoom');

    /*Центрируем карту по маркерам*/
    yaMap.setBounds(yaMap.geoObjects.getBounds(),{checkZoomRange:true}).then(function(){ if(yaMap.getZoom() > 16) yaMap.setZoom(16);});
}