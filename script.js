$(function(){

	var postChart = new Object();
	var selectedChart = 1;
	var	priceLoaded = false; 
	var	smaLoaded = false;  
	var	emaLoaded = false;  
	var	stochLoaded = false; 
	var	rsiLoaded = false;  
	var	adxLoaded = false;  
	var	cciLoaded = false;  
	var	bbandsLoaded = false;  
	var	macdLoaded = false;

	$("#right").prop("disabled",true);

	//getQuote
	$("#getQuote").click(function(){

		inFavList = false;
		quote = $("#quote").val();

		$("#right").prop("disabled",false);
		
		//clear the error			
		$("#chartsErrSMA").empty();
		$("#chartsErrEMA").empty();
		$("#chartsErrSTOCH").empty();
		$("#chartsErrRSI").empty();
		$("#chartsErrADX").empty();
		$("#chartsErrCCI").empty();
		$("#chartsErrBBANDS").empty();
		$("#chartsErrMACD").empty();
		$("#chartsErr").empty();
		$("#stockDetailTableErr").empty();
		$("#newsFeedsErr").empty();
		$("#historicalChartsErr").empty();

		//reset all charts state
		priceLoaded = false; 
		smaLoaded = false;  
		emaLoaded = false;  
		stochLoaded = false; 
		rsiLoaded = false;  
		adxLoaded = false;  
		cciLoaded = false;  
		bbandsLoaded = false;  
		macdLoaded = false;

		allAjaxCalls();
		console.log("2");
		checkFav();
		$("#right").click();			
	
	});
	
	$("#btn-nb4").click(showPriceBt);
	$("#btn-nb5").click(showSMABt);
	$("#btn-nb6").click(showEMABt);
	$("#btn-nb7").click(showSTOCHBt);
	$("#btn-nb8").click(showRSIBt);
	$("#btn-nb9").click(showADXBt);
	$("#btn-nb10").click(showCCIBt);
	$("#btn-nb11").click(showBBANDSBt);
	$("#btn-nb12").click(showMACDBt);

	//check if the company is in the favorite list
	function checkFav(){

		for(var i = 0; i < localStorage.length; i++)    //******* length
	    {
	        var key = localStorage.key(i);              //******* key()

	        if(key.indexOf("companies") == 0) {
	            var value = localStorage.getItem(key);  //******* getItem()
	            // console.log(value);
	            valueJson = JSON.parse(value);

	            for (var j = 0; j < valueJson.length; j++){

	            	if (valueJson[j]['symbol'] == quote) {
		            	$("#starBt").attr("class","glyphicon glyphicon-star");
		            	inFavList = true;
		            	break;
	            	}

	            }

	        }
	    }
	    //empty the star button
	    if(!inFavList){
	    	$("#starBt").attr("class","glyphicon glyphicon-star-empty");
	    }
	}

	//press the clear button
	$("#clear").click(function(){

		$("#right").prop("disabled",true);
		$("#left").click();

	})

	//press the star button
	$("#star").click(function(){
		
		if (!inFavList) {

			$("#starBt").attr("class","glyphicon glyphicon-star");
	        inFavList = true;

	        if ($("#tableFav tr:last-child .changeFav").html().charAt(0) == "-"){
				$("#tableFav tr:last-child .changeFav").addClass("changeFavN");
				$("#tableFav tr:last-child .changeFav").append("<img src='/hw8Images/Down.png' width='15' height='15'>");
			} else {
				$("#tableFav tr:last-child .changeFav").addClass("changeFavP");
				$("#tableFav tr:last-child .changeFav").append("<img src='/hw8Images/Up.png' width='15' height='15'>");
			}
		
			//symbol in favorite list is clicked 	
			$("#tableFav tr:last-child .symbolFav a").click(function(e){
				var symbol = this.textContent;
				e.preventDefault();
				inFavList = false;
				quote = symbol;
				//clear the error			
				$("#chartsErrSMA").empty();
				$("#chartsErrEMA").empty();
				$("#chartsErrSTOCH").empty();
				$("#chartsErrRSI").empty();
				$("#chartsErrADX").empty();
				$("#chartsErrCCI").empty();
				$("#chartsErrBBANDS").empty();
				$("#chartsErrMACD").empty();
				$("#chartsErr").empty();
				$("#stockDetailTableErr").empty();
				$("#newsFeedsErr").empty();
				$("#historicalChartsErr").empty();
				$("#right").prop("disabled",false);

				//reset all charts state
				priceLoaded = false; 
				smaLoaded = false;  
				emaLoaded = false;  
				stochLoaded = false; 
				rsiLoaded = false;  
				adxLoaded = false;  
				cciLoaded = false;  
				bbandsLoaded = false;  
				macdLoaded = false;

				allAjaxCalls();
				console.log("3");
				checkFav();
				$("#right").click();
				return false;
			});

		} else{

			$("#starBt").attr("class","glyphicon glyphicon-star-empty");
	        inFavList = false;
		
		}
		
	});

	//css for Change in Favorite table
	$(".changeFav").each(function(){
		if ((this.textContent).charAt(0) == "-"){
			$(this).addClass("changeFavN");
			$(this).append("<img src='/hw8Images/Down.png' width='15' height='15'>");
		} else {
			$(this).addClass("changeFavP");
			$(this).append("<img src='/hw8Images/Up.png' width='15' height='15'>");
		}
	});
	
	//symbol in favorite list is clicked 	
	$(".symbolFav a").click(function(e){
		var symbol = this.textContent;
		e.preventDefault();
		inFavList = false;
		quote = symbol;
		//clear the error			
		$("#chartsErrSMA").empty();
		$("#chartsErrEMA").empty();
		$("#chartsErrSTOCH").empty();
		$("#chartsErrRSI").empty();
		$("#chartsErrADX").empty();
		$("#chartsErrCCI").empty();
		$("#chartsErrBBANDS").empty();
		$("#chartsErrMACD").empty();
		$("#chartsErr").empty();
		$("#stockDetailTableErr").empty();
		$("#newsFeedsErr").empty();
		$("#historicalChartsErr").empty();
		$("#right").prop("disabled",false);

		//reset all charts state
		priceLoaded = false; 
		smaLoaded = false;  
		emaLoaded = false;  
		stochLoaded = false; 
		rsiLoaded = false;  
		adxLoaded = false;  
		cciLoaded = false;  
		bbandsLoaded = false;  
		macdLoaded = false;

		allAjaxCalls();
		console.log("1");
		checkFav();
		$("#right").click();
		return false;
	});	

	//post on FB
	$("#fbPost").click(function(){

		var selectedChartObj = new Object();
		switch (selectedChart){

		    case 1:
		        selectedChartObj = priceChart;
		        break;
		    case 2:
		        selectedChartObj = SMAChart;
		        break;
		    case 3:
		        selectedChartObj = EMAChart;
		        break;
		    case 4:
		        selectedChartObj = STOCHChart;
		        break;
		    case 5:
		        selectedChartObj = RSIChart;
		        break;
		    case 6:
		        selectedChartObj = ADXChart;
		        break;
		    case 7:
		        selectedChartObj = CCIChart;
		        break;
		    case 8:
		        selectedChartObj = BBANDSChart;
		        break;
		    case 9:
		        selectedChartObj = MACDChart;
		        break;
		    default:

		}

		var exportUrl = 'http://export.highcharts.com/';
		var optionsStr = JSON.stringify(selectedChartObj),
		dataString = encodeURI('async=true&type=jpeg&width=400&options=' + optionsStr);
     		if (window.XDomainRequest) {
	            var xdr = new XDomainRequest();
	            xdr.open("post", exportUrl+ '?' + dataString);
	            xdr.onload = function () {
	                console.log(xdr.responseText);
	                urlPic = exportUrl + xdr.responseText ;
	            };
	            xdr.send();
	        } else {
	        	$.ajax({
	        		type: 'POST',
	        		data: dataString,
	        		url: exportUrl,
	        		success: function (data) {
	        			console.log('get the file from relative url: ', data);
	        			urlPic = exportUrl + data;

	        			FB.ui({
	        				method: 'feed',
	        				link: urlPic,
	        			}, function(response){
	        				if (response && !response.error_message) {
								 alert('Post was published.');
							}else{
								alert('Post was not published.');
							}
							});

	        		},
	        		error: function (err) {
	        			debugger;
	        			console.log('error', err.statusText)
	        		}
	        	});
	        }
	});	

	//allAjaxCalls
	function allAjaxCalls(){

		//table
		$.ajax({

		 	beforeSend: function(){
		 		$("#stockDetailTable").hide();
		 		$("#stockDetailTableBar").show();
		 		$("#star").prop("disabled",true);

		 	},

			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'stock_symbolTable': quote
			},
			dataType:'json',
			success : function(data) {

				$("#stockDetailTable").show();
		 		$("#stockDetailTableBar").hide();
		 		$("#star").prop("disabled",false);

				symbol = data['Stock Ticker Symbol'];
				lastPrice = data['Last Price'];
				change = data['Change'];
				changePercent = data['Change Percent'];
				timeStamp = data['TimeStamp'];
				openPrice = data['Open'];
				close = data['Close'];
				daysRange = data['Days Range'];
				volume = data['Volume'];
				volumeN = data['VolumeN'];
				//fill the stock details table
				$("#symbolTable").html(symbol);
				$("#lpTable").html(lastPrice);

				if(change > 0){
					$("#changeTable").html(change + ' (' + changePercent + ')' + "<img src='/hw8Images/Up.png' width='15' height='15'>");
					$("#changeTable").css('color','green');
				} else if(change < 0) {
					$("#changeTable").html(change + ' (' + changePercent + ')' + "<img src='/hw8Images/Down.png' width='15' height='15'>");
					$("#changeTable").css('color','red');
				} else {
					$("#changeTable").html("0.00 (0.00%)");
				}
				
				$("#timeTable").html(timeStamp);
				$("#openTable").html(openPrice);
				$("#closeTable").html(close);
				$("#rangeTable").html(daysRange);
				$("#volumeTable").html(volume);	

				if (symbol == null) {

					if( $('#stockDetailTableErr').is(':empty') ) {
						$("#stockDetailTable").hide();
						$("#stockDetailTableErr").append("<div class='alert alert-danger'>Error! Failed to get current stock data.</div>");
						$("#star").prop("disabled",true);
					}
					console.log("symbul = null");
				
				}

			},
			error : function(request,error)
			{
				
		 		$("#stockDetailTableBar").hide();

				if( $('#stockDetailTableErr').is(':empty') ) {
					$("#stockDetailTable").hide();
					$("#stockDetailTableErr").append("<div class='alert alert-danger'>Error! Failed to get current stock data.</div>");
					$("#star").prop("disabled",true);
				}
			}

		});

		//Price
		$.ajax({

			beforeSend: function(){
				
				if( selectedChart == 1) {
					showPriceBt();		
				}			
				$("#charts").hide();
				$("#chartsProgress").show();
				$("#chartsErr").hide();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'price': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 1) {
					$("#fbPost").prop("disabled",false);		
				}

				priceLoaded = true;
				$("#charts").show();
				$("#chartsProgress").hide();
				$("#chartsErr").show();
				

				try {

					symbolPrice = data['Stock Ticker Symbol'];
					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatPrice = [];
						for (var i = 0; i < 125; i++) {
							dataFormatPrice.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					priceY = data['price'];
					priceY_reverse = priceY.reverse();
					volumeY = data['volume'];
					volumeY_reverse = volumeY.reverse();

					if (symbolPrice == null) {

						if( $('#chartsErr').is(':empty') ) {
							$("#charts").empty();
							$("#chartsErr").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							priceLoaded = false;
						}

					}else {

							showPrice();

					}

				}catch(e){

					if( $('#chartsErr').is(':empty') ) {
						$("#charts").empty();
						$("#chartsErr").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						priceLoaded = false;
					}
				}

			},
			error : function(request,error)
			{

				$("#chartsProgress").hide();

				if( $('#chartsErr').is(':empty') ) {
					$("#charts").empty();
					$("#chartsErr").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
							priceLoaded = false;
				}

			}

		});

		//SMA
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 2) {
					showSMABt();		
				}

				$("#chartsSMA").hide();
				$("#chartsSMAProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'SMA': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 2) {
					$("#fbPost").prop("disabled",false);
				}
				smaLoaded = true;

				$("#chartsSMAProgress").hide();
				$("#chartsSMA").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatSMA = [];
						for (var i = 0; i < 125; i++) {
							dataFormatSMA.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolSMA = data['Stock Ticker Symbol'];
					valueSMA = data['SMA'];
					SMAY_reverse = valueSMA.reverse();

					if (symbolSMA == null) {

						if( $('#chartsErrSMA').is(':empty') ) {
							$("#chartsSMA").empty();
							$("#chartsErrSMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							smaLoaded = false;
						}

					}else {
						showSMA();
					}

				}catch(e){

					if( $('#chartsErrSMA').is(':empty') ) {
						$("#chartsSMA").empty();
						$("#chartsErrSMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						smaLoaded = false;
					}

				}

			},
			error : function(request,error)
			{
				$("#chartsSMAProgress").hide();
				

				if( $('#chartsErrSMA').is(':empty') ) {
					$("#chartsSMA").empty();
					$("#chartsErrSMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					smaLoaded = false;
				}
			}

		});

		//EMA
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 3) {
					showEMABt();		
				}

				$("#chartsEMA").hide();
				$("#chartsEMAProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'EMA': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 3) {
					$("#fbPost").prop("disabled",false);
				}
				emaLoaded = true;

				$("#chartsEMAProgress").hide();
				$("#chartsEMA").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatEMA = [];
						for (var i = 0; i < 125; i++) {
							dataFormatEMA.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolEMA = data['Stock Ticker Symbol'];
					valueEMA = data['EMA'];
					EMAY_reverse = valueEMA.reverse();

					if (symbolEMA == null) {

						if( $('#chartsErrEMA').is(':empty') ) {
							$("#chartsEMA").empty();
							$("#chartsErrEMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							emaLoaded = false;
						}

					}else {
						showEMA();
					}

				}catch(e){

					if( $('#chartsErrEMA').is(':empty') ) {
						$("#chartsEMA").empty();
						$("#chartsErrEMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
							emaLoaded = false;
					}

				}	

			},
			error : function(request,error)
			{
				$("#chartsEMAProgress").hide();
				

				if( $('#chartsErrEMA').is(':empty') ) {
					$("#chartsEMA").empty();
					$("#chartsErrEMA").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					emaLoaded = false;
				}
			}

		});

		//STOCh
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 4) {
					showSTOCHBt();		
				}

				$("#chartsSTOCH").hide();
				$("#chartsSTOCHProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'STOCH': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 4) {
					$("#fbPost").prop("disabled",false);
				}
				stochLoaded = true;

				$("#chartsSTOCHProgress").hide();
				$("#chartsSTOCH").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatSTOCH = [];
						for (var i = 0; i < 125; i++) {
							dataFormatSTOCH.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolSTOCH = data['Stock Ticker Symbol'];
					valueSTOCHk = data['STOCH_K'];
					valueSTOCHd = data['STOCH_D'];
					STOCHKY_reverse = valueSTOCHk.reverse();
					STOCHDY_reverse = valueSTOCHd.reverse();

					if (symbolSTOCH == null) {

						if( $('#chartsErrSTOCH').is(':empty') ) {
							$("#chartsSTOCH").empty();
							$("#chartsErrSTOCH").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							stochLoaded = false;
						}

					}else {
						showSTOCH();
					}

				}catch(e){

					if( $('#chartsErrSTOCH').is(':empty') ) {
						$("#chartsSTOCH").empty();
						$("#chartsErrSTOCH").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
							stochLoaded = false;
					}

				}

			},
			error : function(request,error)
			{
				$("#chartsSTOCHProgress").hide();
				

				if( $('#chartsErrSTOCH').is(':empty') ) {
					$("#chartsSTOCH").empty();
					$("#chartsErrSTOCH").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					stochLoaded = false;
				}
			}

		});

		//RSi
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 5) {
					showRSIBt();		
				}

				$("#chartsRSI").hide();
				$("#chartsRSIProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'RSI': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 5) {
					$("#fbPost").prop("disabled",false);
				}
				rsiLoaded = true;

				$("#chartsRSIProgress").hide();
				$("#chartsRSI").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatRSI = [];
						for (var i = 0; i < 125; i++) {
							dataFormatRSI.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolRSI = data['Stock Ticker Symbol'];
					valueRSI = data['RSI'];
					RSIY_reverse = valueRSI.reverse();

					if (symbolRSI == null) {

						if( $('#chartsErrRSI').is(':empty') ) {
							$("#chartsRSI").empty();
							$("#chartsErrRSI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							rsiLoaded = false;

						}

					}else {
						showRSI();
					}

				}catch(e){

					if( $('#chartsErrRSI').is(':empty') ) {
						$("#chartsRSI").empty();
						$("#chartsErrRSI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
							rsiLoaded = false;
					}

				}	

			},
			error : function(request,error)
			{
				$("#chartsRSIProgress").hide();
				
				if( $('#chartsErrRSI').is(':empty') ) {
					$("#chartsRSI").empty();
					$("#chartsErrRSI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					rsiLoaded = false;
				}
			}

		});


		//ADX
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 6) {
					showADXBt();		
				}

				$("#chartsADX").hide();
				$("#chartsADXProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'ADX': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 6) {
					$("#fbPost").prop("disabled",false);
				}
				adxLoaded = true;

				$("#chartsADXProgress").hide();
				$("#chartsADX").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatADX = [];
						for (var i = 0; i < 125; i++) {
							dataFormatADX.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolADX = data['Stock Ticker Symbol'];
					valueADX = data['ADX'];
					ADXY_reverse = valueADX.reverse();

					if (symbolADX == null) {

						if( $('#chartsErrADX').is(':empty') ) {
							$("#chartsADX").empty();
							$("#chartsErrADX").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							adxLoaded = false;
						}

					}else {
						showADX();
					}

				}catch(e){

					if( $('#chartsErrADX').is(':empty') ) {
						$("#chartsADX").empty();
						$("#chartsErrADX").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						adxLoaded = false;
					}

				}				

			},
			error : function(request,error)
			{
				$("#chartsADXProgress").hide();
				
				if( $('#chartsErrADX').is(':empty') ) {
					$("#chartsADX").empty();
					$("#chartsErrADX").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					adxLoaded = false;
				}
			}

		});


		//CCI
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 7) {
					showCCIBt();		
				}

				$("#chartsCCI").hide();
				$("#chartsCCIProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'CCI': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 7) {
					$("#fbPost").prop("disabled",false);
				}
				cciLoaded = true;

				$("#chartsCCIProgress").hide();
				$("#chartsCCI").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatCCI = [];
						for (var i = 0; i < 125; i++) {
							dataFormatCCI.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolCCI = data['Stock Ticker Symbol'];
					valueCCI = data['CCI'];
					CCIY_reverse = valueCCI.reverse();

					if (symbolCCI == null) {

						if( $('#chartsErrCCI').is(':empty') ) {
							$("#chartsCCI").empty();
							$("#chartsErrCCI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							cciLoaded = false;
						}

					}else {
						showCCI();
					}

				}catch(e){

					if( $('#chartsErrCCI').is(':empty') ) {
						$("#chartsCCI").empty();
						$("#chartsErrCCI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						cciLoaded = false;
					}

				}

				

			},
			error : function(request,error)
			{
				$("#chartsCCIProgress").hide();
				

				if( $('#chartsErrCCI').is(':empty') ) {
					$("#chartsCCI").empty();
					$("#chartsErrCCI").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					cciLoaded = false;
				}
			}

		});


		//BBANDS
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 8) {
					showBBANDSBt();		
				}

				$("#chartsBBANDS").hide();
				$("#chartsBBANDSProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'BBANDS': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 8) {
					$("#fbPost").prop("disabled",false);
				}
				bbandsLoaded = true;

				$("#chartsBBANDSProgress").hide();
				$("#chartsBBANDS").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatBBANDS = [];
						for (var i = 0; i < 125; i++) {
							dataFormatBBANDS.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolBBANDS = data['Stock Ticker Symbol'];
					valueBBANDSm = data['BBANDS_M'];
					valueBBANDSu = data['BBANDS_U'];
					valueBBANDSl = data['BBANDS_L'];
					BBANDSMY_reverse = valueBBANDSm.reverse();
					BBANDSUY_reverse = valueBBANDSu.reverse();
					BBANDSLY_reverse = valueBBANDSl.reverse();

					if (symbolBBANDS == null) {

						if( $('#chartsErrBBANDS').is(':empty') ) {
							$("#chartsBBANDS").empty();
							$("#chartsErrBBANDS").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							bbandsLoaded = false;

						}

					}else {
						showBBANDS();
					}

				}catch(e){

					if( $('#chartsErrBBANDS').is(':empty') ) {
						$("#chartsBBANDS").empty();
						$("#chartsErrBBANDS").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						bbandsLoaded = false;
					}

				}

				

			},
			error : function(request,error)
			{
				$("#chartsMACDProgress").hide();
				

				if( $('#chartsErrBBANDS').is(':empty') ) {
					$("#chartsBBANDS").empty();
					$("#chartsErrBBANDS").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					bbandsLoaded = false;
				}
			}

		});

		//Macd
		$.ajax({

			beforeSend: function(){

				if( selectedChart == 9) {
					showMACDBt();		
				}

				$("#chartsMACD").hide();
				$("#chartsMACDProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'MACD': quote
			},
			dataType:'json',
			success : function(data) {

				if( selectedChart == 9) {
					$("#fbPost").prop("disabled",false);
				}
				macdLoaded = true;

				$("#chartsMACDProgress").hide();
				$("#chartsMACD").show();

				try{

					dataX = data['timeSeries'];
					if (dataX) {
						dataX.length = 125;
						dataX_reverse = dataX.reverse();

						dataFormatMACD = [];
						for (var i = 0; i < 125; i++) {
							dataFormatMACD.push(dataX_reverse[i].substring(5,7)+'/'+dataX_reverse[i].substring(8,10));
						}
					}

					symbolMACD = data['Stock Ticker Symbol'];
					valueMACD = data['MACD'];
					valueMACDh = data['MACD_H'];
					valueMACDs = data['MACD_S'];
					MACDY_reverse = valueMACD.reverse();
					MACDHY_reverse = valueMACDh.reverse();
					MACDSY_reverse = valueMACDs.reverse();

					if (symbolMACD == null) {

						if( $('#chartsErrMACD').is(':empty') ) {
							$("#chartsMACD").empty();
							$("#chartsErrMACD").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
							$("#fbPost").prop("disabled",true);
							macdLoaded = false;

						}

					}else {
						showMACD();
					}

				}catch(e){

					if( $('#chartsErrMACD').is(':empty') ) {
						$("#chartsMACD").empty();
						$("#chartsErrMACD").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
						$("#fbPost").prop("disabled",true);
						macdLoaded = false;
					}

				}

				

			},
			error : function(request,error)
			{

				$("#chartsMACDProgress").hide();
				

				if( $('#chartsErrMACD').is(':empty') ) {
					$("#chartsMACD").empty();
					$("#chartsErrMACD").append("<div class='alert alert-danger'>Error! Failed to get price data.</div>");
					$("#fbPost").prop("disabled",true);
					macdLoaded = false;
				}
			}

		});

		//Historical Chart
		$.ajax({
			beforeSend: function(){
				$("#historicalChartsCon").hide();
				$("#historicalProgress").show();

			},
			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'hisChart': quote
			},
			dataType:'json',
			success : function(data) {

				$("#historicalProgress").hide();
				$("#historicalChartsCon").show();

				try{
					if (data[0][0] == 0) {

						if( $('#historicalChartsErr').is(':empty') ) {
							$("#historicalChartsCon").empty();
							$("#historicalChartsErr").append("<div class='alert alert-danger'>Error! Failed to get historical charts data.</div>");
						}

					} else {

						Highcharts.stockChart('historicalChartsCon', {

							rangeSelector: {
								buttons: [{
									type: 'week',
									count: 1,
									text: '1w'
								}, {
									type: 'month',
									count: 1,
									text: '1m'
								}, {
									type: 'month',
									count: 3,
									text: '3m'
								},
								{
									type: 'month',
									count: 6,
									text: '6m'
								}

								, {
									type: 'YTD',
									count: 1,
									text: 'YTD'
								},
								{
									type: 'year',
									count: 1,
									text: '1y'
								}, {
									type: 'all',
									count: 1,
									text: 'All'
								}],
								selected: 0
							},

							title: {
								text: quote + ' Stock Price'
							},
                             subtitle: {
                                 useHTML: true,
                                 text: '<a href="https://www.alphavantage.co/" target="_blank">' +
                                 'Source: Alpha Vantage</a>',
                                 style:{
                                     color: 'blue'
                                 }
                             },
                             yAxis:{
                                 title: {
                                     text: 'Stock Value'
                                 }
                             },
                             tooltip: {
									valueDecimals: 2,
									split:false
							},
							series: [{
								name: quote + ' Stock Price',
								data: data,
								type: 'area'
							}],
                             responsive: {
                                 rules: [{
                                         condition: {
                                         maxWidth: 500
                                     },
                                     chartOptions: {
                                         rangeSelector: {
                                             buttons: [{
                                                 type: 'month',
                                                 count: 1,
                                                 text: '1m'
                                             }, {
                                                 type: 'month',
                                                 count: 3,
                                                 text: '3m'
                                             },
                                             {
                                                 type: 'month',
                                                 count: 6,
                                                 text: '6m'
                                             },
                                             {
                                                 type: 'year',
                                                 count: 1,
                                                 text: '1y'
                                             }, {
                                                 type: 'all',
                                                 count: 1,
                                                 text: 'All'
                                             }],
                                             selected: 0,
                                             inputEnabled: false
                                         }
                                     }
                                 }]
                             }
						});
					}
				}catch(e){

					if( $('#historicalChartsErr').is(':empty') ) {
						$('#historicalChartsCon').empty();
						$("#historicalChartsErr").append("<div class='alert alert-danger'>Error! Failed to get historical charts data.</div>");
					}

				}

				
				

			},
			error : function(request,error)
			{
				$("#historicalProgress").hide();
				

				if( $('#historicalChartsErr').is(':empty') ) {
					$('#historicalChartsCon').empty();
					$("#historicalChartsErr").append("<div class='alert alert-danger'>Error! Failed to get historical charts data.</div>");
				}
			}

		});

		//news
		$.ajax({

			beforeSend: function(){
				$("#newsFeedsContent").hide();
				$("#newsFeedsProgress").show();

			},

			url : 'http://cs-server.usc.edu:37394/hw8_backend/index.php',
			type : 'GET',
			data : {
				'news': quote
			},
			dataType:'json',
			success : function(data) {

				$("#newsFeedsContent").show();
				$("#newsFeedsProgress").hide();

				try{
					$("#newsTitle1").html(data['title'][0]);
					$("#newsAuthor1").html(data['author'][0]['0']);
					$("#newsDate1").html(data['date'][0]);
					$("#newsLink1").attr("href", data['link'][0]);

					$("#newsTitle2").html(data['title'][1]);
					$("#newsAuthor2").html(data['author'][1]['0']);
					$("#newsDate2").html(data['date'][1]);
					$("#newsLink2").attr("href", data['link'][1]);

					$("#newsTitle3").html(data['title'][2]);
					$("#newsAuthor3").html(data['author'][2]['0']);
					$("#newsDate3").html(data['date'][2]);
					$("#newsLink3").attr("href", data['link'][2]);

					$("#newsTitle4").html(data['title'][3]);
					$("#newsAuthor4").html(data['author'][3]['0']);
					$("#newsDate4").html(data['date'][3]);
					$("#newsLink4").attr("href", data['link'][3]);

					$("#newsTitle5").html(data['title'][4]);
					$("#newsAuthor5").html(data['author'][4]['0']);
					$("#newsDate5").html(data['date'][4]);
					$("#newsLink5").attr("href", data['link'][4]);
				}
				catch(e){

					if( $('#newsFeedsErr').is(':empty') ) {
						$("#newsFeedsContent").empty();	
						$("#newsFeedsErr").append("<div class='alert alert-danger'>Error! Failed to get news feed data.</div>");
						
					}
					
				}
					
				
			},
			error : function(request,error)
			{
				
				$("#newsFeedsProgress").hide();

				if( $('#newsFeedsErr').is(':empty') ) {
						$("#newsFeedsContent").empty();	
						$("#newsFeedsErr").append("<div class='alert alert-danger'>Error! Failed to get news feed data.</div>");
						
					}
			}
			});
	}

	function showPriceBt(){

		$("#priceBT").show();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 1;

		if(!priceLoaded){
			$("#fbPost").prop("disabled",true);
		} else {
			$("#fbPost").prop("disabled",false);
		}
		
	}

	//draw charts, price
	function showPrice(){
			

			priceChart = new Object();
			priceChart = {
					title: {
						text: symbolPrice + ' Stock Price and Volume'
					},
					subtitle: {
						useHTML: true,
						text: '<a href="https://www.alphavantage.co/" target="_blank">' +
						'Source: Alpha Vantage</a>',
						style:{
							color: 'blue'
						}
					},
					colors:['#0000ff','red'],
					chart:{
						zoomType:'x'
					},
					xAxis: {
						categories:dataFormatPrice,

						tickPositioner: function() {
							let res = [];
							for(let i = 0; i < this.categories.length; i++) {
								if(i % 10 == 0) res.push(this.categories.length - 1 - i);
							}
							return res;
						}
					},
					yAxis: [{
						title: {
							text: 'Stock Price'
						},
						labels: {
							formatter: function () {
								return this.value;
							}
						}
				    },{ // Secondary yAxis
				    	title: {
				    		text: 'Volume'
				    	},
				    	labels: {
				    		format: '{value}M'
				    	},
				    	opposite: true,
				    	max: 250,
				    	minTickInterval:50
				    }
				    ],
				    plotOptions: {
				    	area: {
				    		marker: {
				    			enabled: false,
				    			symbol: 'circle',
				    			radius: 1,
				    			states: {
				    				hover: {
				    					enabled: true
				    				}
				    			}
				    		},
				    		fillOpacity: 0.1
				    	}
				    },
				    series: [{
				    	name: 'Price',
				    	data:priceY_reverse,
				    	type:'area',
				    	colors:1
				    },{
				    	name: 'Volume',
				    	data: volumeY_reverse,
				    	type:'column',
				    	yAxis: 1
				    }]
			};
			var myChart = Highcharts.chart('charts', priceChart);	
	}

	function showSMABt(){
		$("#priceBT").hide();
		$("#SMABT").show();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 2;

		if(!smaLoaded){
			$("#fbPost").prop("disabled",true);
		} else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//SMA chart
	function showSMA(){

			SMAChart = new Object();
			SMAChart = {

				title: {
					text: 'Simple Moving Average (SMA)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['rgb(232,153,148)'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatSMA,
					min: 0,
					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'SMA'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolSMA,
					data:SMAY_reverse,
					threshold:null
				}]
			};
			var myChart = Highcharts.chart('chartsSMA', SMAChart);	

	}

	function showEMABt(){

		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").show();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 3;

		if(!emaLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//EMA chart
	function showEMA(){

			EMAChart = new Object();
			EMAChart = {
				title: {
					text: 'Exponential Moving Average (EMA)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['rgb(232,153,148)'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatEMA,
					min: 0,
					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'EMA'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolEMA,
					data:EMAY_reverse,
					threshold:null
				}]
			};

			var myChart = Highcharts.chart('chartsEMA', EMAChart);	
	}

	function showSTOCHBt(){

		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").show();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 4;

		if(!stochLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//STOCH chart
	function showSTOCH(){

			STOCHChart = new Object();
			STOCHChart = {
				title: {
					text: 'Stochastic Oscillator (STOCH)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['red','blue'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatSTOCH,
					min: 0,
					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'STOCH'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolSTOCH + ' SlowK',
					data:STOCHKY_reverse,
					threshold:null
				},{
					name: symbolSTOCH + ' SlowD',
					data:STOCHDY_reverse,
					threshold:null
				}]
			};
			var myChart = Highcharts.chart('chartsSTOCH', STOCHChart);	
	}

	function showRSIBt(){
		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").show();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 5;

		if(!rsiLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//RSI chart
	function showRSI(){

			RSIChart = new Object();
			RSIChart = {
				title: {
					text: 'Relative Strength Index (RSI)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['rgb(232,153,148)'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatRSI,
					min: 0,
					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'RSI'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolRSI,
					data:RSIY_reverse,
					threshold:null
				}]
			}
			var myChart = Highcharts.chart('chartsRSI', RSIChart);	
	}

	function showADXBt(){
		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").show();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 6;

		if(!adxLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//ADX chart
	function showADX(){

			ADXChart = new Object();
			ADXChart = {
				title: {
					text: 'Average Directional Index (ADX)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['rgb(232,153,148)'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatADX,
					min: 0,
					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'ADX'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolADX,
					data:ADXY_reverse,
					threshold:null
				}]
			}
			var myChart = Highcharts.chart('chartsADX', ADXChart);	
	}

	function showCCIBt(){
		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").show();
		$("#BBANDSBT").hide();
		$("#MACDBT").hide();
		selectedChart = 7;

		if(!cciLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//CCI chart
	function showCCI(){

			CCIChart = new Object();
			CCIChart = {
				title: {
					text: 'Commodity Channel Index (CCI)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['rgb(232,153,148)'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatCCI,

					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'CCI'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolCCI,
					data:CCIY_reverse,
					threshold:null
				}]
			};
			var myChart = Highcharts.chart('chartsCCI', CCIChart);	
	}

	function showBBANDSBt(){
		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").show();
		$("#MACDBT").hide();
		selectedChart = 8;

		if(!bbandsLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//BBANDS chart
	function showBBANDS(){

			BBANDSChart = new Object();
			BBANDSChart = {
				title: {
					text: 'Bollinger Bands (BBANDS)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['red','black','green'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatBBANDS,

					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'BBANDS'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolBBANDS + ' Real Middle Band',
					data:BBANDSMY_reverse,
					threshold:null
				},{
					name: symbolBBANDS + ' Real Upper Band',
					data:BBANDSUY_reverse,
					threshold:null
				},{
					name: symbolBBANDS + ' Real Lower Band',
					data:BBANDSLY_reverse,
					threshold:null
				}]
			};
			var myChart = Highcharts.chart('chartsBBANDS', BBANDSChart);			
	}

	function showMACDBt(){
		$("#priceBT").hide();
		$("#SMABT").hide();
		$("#EMABT").hide();
		$("#STOCHBT").hide();
		$("#RSIBT").hide();
		$("#ADXBT").hide();
		$("#CCIBT").hide();
		$("#BBANDSBT").hide();
		$("#MACDBT").show();
		selectedChart = 9;

		if(!macdLoaded){
			$("#fbPost").prop("disabled",true);
		}else {
			$("#fbPost").prop("disabled",false);
		}
	}

	//MACD chart
	function showMACD(){

			MACDChart = new Object();
			MACDChart = {
				title: {
					text: 'Moving Average Convergence/Divergence (MACD)'
				},
				subtitle: {
					useHTML: true,
					text: '<a href="https://www.alphavantage.co/" target="_blank">' +
					'Source: Alpha Vantage</a>',
					style:{
						color: 'blue'
					}
				},
				colors:['red','orange','purple'],
				chart:{
						zoomType:'x'
					},
				xAxis: {
					categories:dataFormatMACD,

					tickPositioner: function() {
						let res = [];
						for(let i = 0; i < this.categories.length; i++) {
							if(i % 5 == 0) res.push(this.categories.length - 1 - i);
						}
						return res;
					}
				},
				yAxis: {
					title: {
						text: 'MACD'
					},
					labels: {
						formatter: function () {
							return this.value;
						}
					}
				},
				series: [{
					name: symbolMACD + ' MACD',
					data:MACDY_reverse,
					threshold:null
				},{
					name: symbolMACD + ' MACD_Hist',
					data:MACDHY_reverse,
					threshold:null
				},{
					name: symbolMACD + ' MACD_Signal',
					data:MACDSY_reverse,
					threshold:null
				}]
			};
			var myChart = Highcharts.chart('chartsMACD', MACDChart);
	}

});