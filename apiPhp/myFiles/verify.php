<?php
header("Access-Control-Allow-Origin: *");
header("Acess-Control-Allow-Origin: *");

require '/home/vol9_7/epizy.com/epiz_26606400/htdocs/apiPhp/myFiles/jwt.php';
//Replace this with SHA256 OR 512

if($_GET['token']){
  try {
      $uToken=$_GET['token'];
      $deco=(array)JWT::decode($uToken, new Key($privateKey, 'HS256'));
      $exp=$deco['exp'];
      if($exp<=time()){
        echo "Expired" ;
      }
      else{
        $rToken=auth($deco['umail']);
        echo json_encode($rToken);
        // echo "Signature Verified";
      }
    }
catch(Exception $e) {
      echo $e->getMessage();
    }
  }
else{
  echo "error";
}

?>
