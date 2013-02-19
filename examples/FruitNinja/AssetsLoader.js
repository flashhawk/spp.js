FruitGame.AssetsLoader=function() 
{
	SPP.EventDispatcher.call(this);
	_this=this;
	this.fruits=[];
	this.shadow=null;
	this.throwSound=null;
	this.splatterSound=null;
	this.loader=new PxLoader();
	
	this.start=function()
	{
		var array=FruitGame.assets.fruits;
		for(var i=0;i<array.length;i++)
		{
			var obj={};
			obj.full=this.loader.addImage(array[i].full);
			obj.leftHalf=this.loader.addImage(array[i].leftHalf);
			obj.rightHalf=this.loader.addImage(array[i].rightHalf);
			obj.splash=this.loader.addImage(array[i].splash);
			obj.juice=this.loader.addImage(array[i].juice);
			this.fruits.push(obj);
		};
		this.shadow=this.loader.addImage(FruitGame.assets.shadow);
		this.loader.addCompletionListener(function() 
		{ 
			_this.dispatchEvent(new SPP.Event("complete"));
		}); 
		this.loader.start();
	};	
};