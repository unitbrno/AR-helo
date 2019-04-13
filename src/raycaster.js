function register_raycaster_callback(callback_fn)
{
    AFRAME.registerComponent('collider-check', {
        dependencies: ['raycaster'],

        init: function () {
            this.el.addEventListener('raycaster-intersection', function (e) {
            console.log('Player hit something!');
            hit_elem = e.detail.els[0]
            if ($(hit_elem).hasClass('collidable'))  // filtering of raycast tested objects does not work
            {
                select_new_plane(hit_elem)
            }
            });
        }
    });
}