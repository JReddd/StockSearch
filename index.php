<?php 
	header('Access-Control-Allow-Origin: *');
	date_default_timezone_set('America/New_York'); 

		echo json_encode($twitter);
	}

	//AutoComplete
	if(isset($_GET['input'])){
		$urlAuto = "http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=".$_GET["input"];
		$contentsAuto = file_get_contents($urlAuto);
		$jsonAuto = json_decode($contentsAuto);
		$arrayAuto = array('auto' => $jsonAuto);
		echo json_encode($arrayAuto);
	}

	//table data
	if(isset($_GET['stock_symbolTable'])){
		$urldata = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$_GET["stock_symbolTable"]."&outputsize=full&apikey=DTW19718TK5M9QTN";
		$contents = file_get_contents($urldata);
		$jsonObj = json_decode($contents,true);

		//data in table
		$symbol = $jsonObj['Meta Data']['2. Symbol']; 									//Stock Ticker Symbol
		$timeSeries = array_keys($jsonObj['Time Series (Daily)']);
		$timestamp = $timeSeries[0]; 										
		$timePrevious = $timeSeries[1];

		if(strlen ($jsonObj['Meta Data']['3. Last Refreshed']) == 10){
			$TimeStamp = $timestamp.' 16:00:00 EST';
		} else{
			$TimeStamp = $jsonObj['Meta Data']['3. Last Refreshed'].' EST';
		}

		$closeToday = number_format($jsonObj['Time Series (Daily)'][$timestamp]['4. close'],2); 			//Last Price
		$openToday = number_format($jsonObj['Time Series (Daily)'][$timestamp]['1. open'],2);			//Open
		$closeYesterday = number_format($jsonObj['Time Series (Daily)'][$timePrevious]['4. close'],2); 	//Previous Close

		if(strlen ($jsonObj['Meta Data']['3. Last Refreshed']) == 10){
			$close = $closeToday;
		}else{
			$close = $closeYesterday;
		}
		
		$change = number_format($jsonObj['Time Series (Daily)'][$timestamp]['4. close'] - $jsonObj['Time Series (Daily)'][$timePrevious]['4. close'], 2);						//Change
		$changePercent = number_format($change / $jsonObj['Time Series (Daily)'][$timePrevious]['4. close'] * 100,2).'%';			//Change Percent
		$low = number_format($jsonObj['Time Series (Daily)'][$timestamp]['3. low'],2);
		$high = number_format($jsonObj['Time Series (Daily)'][$timestamp]['2. high'],2);
		$daysRange = $low."-".$high;													//Day's Range
		$volume = number_format($jsonObj['Time Series (Daily)'][$timestamp]['5. volume']); //volume
		$volumeN = $jsonObj['Time Series (Daily)'][$timestamp]['5. volume'];

		
		$arrayTable = array('Stock Ticker Symbol' => $symbol, 'Last Price' => $closeToday, 'Change' => $change, 'Change Percent' => $changePercent, 'TimeStamp' => $TimeStamp, 'Open' => $openToday, 'Close' => $close, 'Days Range' => $daysRange, 'Volume' => $volume, 'VolumeN' => $volumeN);
		echo json_encode($arrayTable);
	}


	//price
	if(isset($_GET['price'])){
		$urldata = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$_GET["price"]."&outputsize=full&apikey=DTW19718TK5M9QTN";
		$contents = file_get_contents($urldata);
		$jsonObj = json_decode($contents,true);
		$symbol = $jsonObj['Meta Data']['2. Symbol']; 
		$timeSeries = array_keys($jsonObj['Time Series (Daily)']);
		$priceSeries = array();
		$volumeSeries = array();
		for ($i=0; $i < 125; $i++) {
			array_push($priceSeries, (float)$jsonObj['Time Series (Daily)'][$timeSeries[$i]]['4. close']);
			array_push($volumeSeries, (float)$jsonObj['Time Series (Daily)'][$timeSeries[$i]]['5. volume']/1000000);
		}
		$arrayPrice = array('Stock Ticker Symbol' => $symbol, 'price' => $priceSeries, 'volume' => $volumeSeries, 'timeSeries' => $timeSeries);
		echo json_encode($arrayPrice);
	}

	//SMA
	if (isset($_GET['SMA'])) {
		$urlSMA = "https://www.alphavantage.co/query?function=SMA&symbol=".$_GET["SMA"]."&interval=daily&time_period=10&series_type=close&apikey=DTW19718TK5M9QTN";
		$contentsSMA = file_get_contents($urlSMA);
		$jsonObjSMA = json_decode($contentsSMA,true);
		$symbolSMA = $jsonObjSMA['Meta Data']['1: Symbol'];
		$timeSeriesSMA = array_keys($jsonObjSMA['Technical Analysis: SMA']);
		$SMASeries = array();
		for ($i=0; $i < 125; $i++) {
			array_push($SMASeries, (float)$jsonObjSMA['Technical Analysis: SMA'][$timeSeriesSMA[$i]]['SMA']);
		}
		$arraySMA = array('Stock Ticker Symbol' => $symbolSMA,'SMA' => $SMASeries, 'timeSeries' => $timeSeriesSMA);
		echo json_encode($arraySMA);
	}

	//EMA
	if (isset($_GET['EMA'])) {
		$urlEMA = "https://www.alphavantage.co/query?function=EMA&symbol=".$_GET["EMA"]."&interval=daily&time_period=10&series_type=close&apikey=DTW19718TK5M9QTN";
		$contentsEMA = file_get_contents($urlEMA);
		$jsonObjEMA = json_decode($contentsEMA,true);
		$symbolEMA = $jsonObjEMA['Meta Data']['1: Symbol'];
		$timeSeriesEMA = array_keys($jsonObjEMA['Technical Analysis: EMA']);
		$EMASeries = array();
		for ($i=0; $i < 125; $i++) {
			array_push($EMASeries, (float)$jsonObjEMA['Technical Analysis: EMA'][$timeSeriesEMA[$i]]['EMA']);
		}
		$arrayEMA = array('Stock Ticker Symbol' => $symbolEMA,'EMA' => $EMASeries, 'timeSeries' => $timeSeriesEMA);
		echo json_encode($arrayEMA);
	}

	//STOCH
	if (isset($_GET['STOCH'])) {
		$urlSTOCH = "https://www.alphavantage.co/query?function=STOCH&symbol=".$_GET["STOCH"]."&interval=daily&apikey=DTW19718TK5M9QTN";
		$contentsSTOCH = file_get_contents($urlSTOCH);
		$jsonObjSTOCH = json_decode($contentsSTOCH,true);
		$symbolSTOCH = $jsonObjSTOCH['Meta Data']['1: Symbol'];
		$timeSeriesSTOCH = array_keys($jsonObjSTOCH['Technical Analysis: STOCH']);
		$STOCHSeriesK = array();
		$STOCHSeriesD = array();
		for ($i=0; $i < 125; $i++) {
			array_push($STOCHSeriesK, (float)$jsonObjSTOCH['Technical Analysis: STOCH'][$timeSeriesSTOCH[$i]]['SlowK']);
			array_push($STOCHSeriesD, (float)$jsonObjSTOCH['Technical Analysis: STOCH'][$timeSeriesSTOCH[$i]]['SlowD']);
		}
		$arraySTOCH = array('Stock Ticker Symbol' => $symbolSTOCH,'STOCH_K' => $STOCHSeriesK, 'STOCH_D' => $STOCHSeriesD, 'timeSeries' => $timeSeriesSTOCH);
		echo json_encode($arraySTOCH);
	}

	//RSI
	if(isset($_GET['RSI'])){
		$urlRSI = "https://www.alphavantage.co/query?function=RSI&symbol=".$_GET["RSI"]."&interval=daily&time_period=10&series_type=close&apikey=DTW19718TK5M9QTN";
		$contentsRSI = file_get_contents($urlRSI);
		$jsonObjRSI = json_decode($contentsRSI,true);
		$symbolRSI = $jsonObjRSI['Meta Data']['1: Symbol'];
		$timeSeriesRSI = array_keys($jsonObjRSI['Technical Analysis: RSI']);
		$RSISeries = array();
		for ($i=0; $i < 125; $i++) { 
			array_push($RSISeries, (float)$jsonObjRSI['Technical Analysis: RSI'][$timeSeriesRSI[$i]]['RSI']);
		}
		$arrayRSI = array('Stock Ticker Symbol' => $symbolRSI,'RSI' => $RSISeries, 'timeSeries' => $timeSeriesRSI);
		echo json_encode($arrayRSI);
	}


	//ADX
	if(isset($_GET['ADX'])){
		$urlADX = "https://www.alphavantage.co/query?function=ADX&symbol=".$_GET["ADX"]."&interval=daily&time_period=10&apikey=DTW19718TK5M9QTN";
		$contentsADX = file_get_contents($urlADX);
		$jsonObjADX = json_decode($contentsADX,true);
		$symbolADX = $jsonObjADX['Meta Data']['1: Symbol'];
		$timeSeriesADX = array_keys($jsonObjADX['Technical Analysis: ADX']);
		$ADXSeries = array();
		for ($i=0; $i < 125; $i++) { 
			array_push($ADXSeries, (float)$jsonObjADX['Technical Analysis: ADX'][$timeSeriesADX[$i]]['ADX']);
		}
		$arrayADX = array('Stock Ticker Symbol' => $symbolADX,'ADX' => $ADXSeries, 'timeSeries' => $timeSeriesADX);
		echo json_encode($arrayADX);
	}

	//CCI
	if(isset($_GET['CCI'])){
		$urlCCI = "https://www.alphavantage.co/query?function=CCI&symbol=".$_GET["CCI"]."&interval=daily&time_period=10&apikey=DTW19718TK5M9QTN";
		$contentsCCI = file_get_contents($urlCCI);
		$jsonObjCCI = json_decode($contentsCCI,true);
		$symbolCCI = $jsonObjCCI['Meta Data']['1: Symbol'];
		$timeSeriesCCI = array_keys($jsonObjCCI['Technical Analysis: CCI']);
		$CCISeries = array();
		for ($i=0; $i < 125; $i++) { 
			array_push($CCISeries, (float)$jsonObjCCI['Technical Analysis: CCI'][$timeSeriesCCI[$i]]['CCI']);
		}
		$arrayCCI = array('Stock Ticker Symbol' => $symbolCCI,'CCI' => $CCISeries, 'timeSeries' => $timeSeriesCCI);
		echo json_encode($arrayCCI);
	}


	//BBANDS
	if(isset($_GET['BBANDS'])){
		$urlBBANDS = "https://www.alphavantage.co/query?function=BBANDS&symbol=".$_GET["BBANDS"]."&interval=daily&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=DTW19718TK5M9QTN";
		$contentsBBANDS = file_get_contents($urlBBANDS);
		$jsonObjBBANDS = json_decode($contentsBBANDS,true);
		$symbol = $jsonObjBBANDS['Meta Data']['1: Symbol'];
		$timeSeriesBBANDS = array_keys($jsonObjBBANDS['Technical Analysis: BBANDS']);
		$BBANDSSeriesU = array();
		$BBANDSSeriesL = array();
		$BBANDSSeriesM = array();
		for ($i=0; $i < 125; $i++) { 
			array_push($BBANDSSeriesU, (float)$jsonObjBBANDS['Technical Analysis: BBANDS'][$timeSeriesBBANDS[$i]]['Real Upper Band']);
			array_push($BBANDSSeriesL, (float)$jsonObjBBANDS['Technical Analysis: BBANDS'][$timeSeriesBBANDS[$i]]['Real Lower Band']);
			array_push($BBANDSSeriesM, (float)$jsonObjBBANDS['Technical Analysis: BBANDS'][$timeSeriesBBANDS[$i]]['Real Middle Band']);
		}
		$arrayBBANDS = array('Stock Ticker Symbol' => $symbol,'BBANDS_M' => $BBANDSSeriesM, 'BBANDS_U' => $BBANDSSeriesU, 'BBANDS_L' => $BBANDSSeriesL, 'timeSeries' => $timeSeriesBBANDS);
		echo json_encode($arrayBBANDS);
	}

	//MACD
	if(isset($_GET['MACD'])){
		$urlMACD = "https://www.alphavantage.co/query?function=MACD&symbol=".$_GET["MACD"]."&interval=daily&series_type=close&apikey=DTW19718TK5M9QTN";
		$contentsMACD = file_get_contents($urlMACD);
		$jsonObjMACD = json_decode($contentsMACD,true);
		$symbolMACD = $jsonObjMACD['Meta Data']['1: Symbol'];
		$timeSeriesMACD = array_keys($jsonObjMACD['Technical Analysis: MACD']);
		$MACDSeries = array();
		$MACDSeriesS = array();
		$MACDSeriesH = array();
		for ($i=0; $i < 125; $i++) { 
			array_push($MACDSeries, (float)$jsonObjMACD['Technical Analysis: MACD'][$timeSeriesMACD[$i]]['MACD']);
			array_push($MACDSeriesS, (float)$jsonObjMACD['Technical Analysis: MACD'][$timeSeriesMACD[$i]]['MACD_Signal']);
			array_push($MACDSeriesH, (float)$jsonObjMACD['Technical Analysis: MACD'][$timeSeriesMACD[$i]]['MACD_Hist']);
		}
		$arrayMACD = array('Stock Ticker Symbol' => $symbolMACD,'MACD' => $MACDSeries, 'MACD_H' => $MACDSeriesH, 'MACD_S' => $MACDSeriesS, 'timeSeries' => $timeSeriesMACD);
		echo json_encode($arrayMACD);
	}

	//Historical Charts
	if(isset($_GET['hisChart'])){
		$urldata = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=".$_GET["hisChart"]."&outputsize=full&apikey=DTW19718TK5M9QTN";
		$contents = file_get_contents($urldata);
		$jsonObj = json_decode($contents,true);
		$timeSeries = array_keys($jsonObj['Time Series (Daily)']);

		$priceSeries1000 = array();
		$timeSeries1000 = array();
		$arrayHisChart = array();

		for ($i=999; $i >= 0; $i--) { 
			array_push($arrayHisChart, "[".strtotime($timeSeries[$i])."000,".(float)$jsonObj['Time Series (Daily)'][$timeSeries[$i]]['4. close']."]");
		}

		$string = implode(",",$arrayHisChart);
		$finalData = "[".$string."]";
		echo $finalData;

	}
	
	//news
	if (isset($_GET['news'])) {
		
		//data in news
		$urlNews = "https://seekingalpha.com/api/sa/combined/".$_GET['news'].".xml";
		$xmlNews = simplexml_load_file($urlNews);
		
		//print_r( $xmlNews );
		$jsonNews = json_encode($xmlNews);
		//echo $jsonNews;
		$arrayNews = json_decode($jsonNews,TRUE);

		$newsList = array();
		$linkList = array();
		$linkList_article = array();
		$dateList =	array();
		$authorList = array();
		$allnews = array_keys($arrayNews['channel']['item']);
		for ($i=0; $i < count($allnews); $i++) { 
			array_push($linkList, $arrayNews['channel']['item'][$i]['link']);
		}
		for ($i=0; $i < count($allnews); $i++) { 
			if (preg_match('/article/', $linkList[$i])) {
				array_push($linkList_article, $linkList[$i]);
				array_push($dateList, substr($arrayNews['channel']['item'][$i]['pubDate'],0,26).' EST');
				array_push($authorList, $xmlNews->channel->item[$i]->children('sa', true)->author_name);
				array_push($newsList, $arrayNews['channel']['item'][$i]['title']);
				// echo $xmlNews->channel->item[$i]->children('sa', true)->author_name;
			}
		}

		if (count($linkList_article) >= 5) {
				$arrayArticle = array('title' => array_slice($newsList, 0,5), 'link' => array_slice($linkList_article, 0,5), 'author' => array_slice($authorList, 0,5), 'date' => array_slice($dateList, 0,5));
			} else{
				$arrayArticle = array('title' => $newsList, 'link' => $linkList_article, 'author' => $authorList, 'date' => $dateList);
			}
		echo json_encode($arrayArticle);

	}

?>