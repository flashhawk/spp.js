SPP.UIDUtil = { _counter:0 };

/**
 * 根据指定名字生成一个全局唯一的ID，如Stage1，Bitmap2等。
 */
SPP.UIDUtil.createUID = function(name)
{
	var charCode = name.charCodeAt(name.length - 1);
    if (charCode >= 48 && charCode <= 57) name += "_";
    return name + this._counter++;
};