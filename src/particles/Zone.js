SPP.Zone = function(boundary,type)
{
    this.boundary=boundary||null;
    this.type=type||SPP.Zone.OFFSCREEN;
    this.bounceIntensity = 2;
};
SPP.Zone.OFFSCREEN= "_offscreen";
SPP.Zone.BOUNCE = "_bounce";
SPP.Zone.prototype = {
    constructor : SPP.Zone,
    render:function(target)
    {
        this[this.type](target);
    },
    _bounce: function (target)
    {

        if (target.position.x < this.boundary.left()
            || target.position.x > this.boundary.right())
        {
            target.position.x = target.position.x < this.boundary.left() ? this.boundary
                .left()
                : this.boundary.right();
            target.velocity.scaleX(-this.bounceIntensity);

        }
        if (target.position.y < this.boundary.top()
            || target.position.y > this.boundary.bottom())
        {
            target.position.y = target.position.y < this.boundary.top() ? this.boundary
                .top()
                : this.boundary.bottom();
            target.velocity.scaleY(-this.bounceIntensity);
        }
        target.acceleration.scale(0);

    },
    _offscreen: function (target)
    {

        if (target.position.x < this.boundary.left())
        {
            target.position.x = this.boundary.right();
        }

        if (target.position.x > this.boundary.right())
        {
            target.position.x = this.boundary.left();
        }

        if (target.position.y < this.boundary.top())
        {
            target.position.y = this.boundary.bottom();
        }

        if (target.position.y > this.boundary.bottom())
        {
            target.position.y = this.boundary.top();
        }

    }
};
