 <?php 


$connection = pg_connect ("host=localhost dbname=teletiq user=postgres password=postgres");
if($connection) {
   $REQ =  $_GET['QUERY'];
   echo $REQ;
   $query = "INSERT INTO pages (query) VALUES ('$REQ')";


   if (pg_query($connection,$query)){
   	echo "Enregistrée";
   	} else {
   		echo "dont save";
   	}
} else {
    echo 'there has been an error connecting';
} 

 ?>