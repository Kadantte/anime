<?php
$page_title="Home";
$desc = "Home Page";
require_once("header.php");
require_once("image.thumb.php");
?>
<div id="wrap">
   <div id="content">
     <div id="left_content">
       <div id="slider" class="sections">
       <?php if(count($images_list>0)){ ?>
       <div class="next"></div>
       <div class="prev"></div>
         <div class="slide">
         <img alt='image' src="<?php echo "images/".$images_list[0]['i_file'];?>" width="650" height="360" />
         <div class="pagination">
          <div class="content">
             <div class="bigtitle"><?php echo $images_list[0]['i_bigtitle'];?></div>
             <div class="smalltitle"><?php echo $images_list[0]['i_smalltitle'];?></div>
             <div class="desc"><?php echo $images_list[0]['i_desc'];?></div>
             <a href="<?php echo $images_list[0]['i_link'];?>" class="watch">Watch Now</a>
           </div> <!--/content--> 
           <div class="circle">
           <?php for($i=0;$i<count($images_list);$i++){ ?>
               <div class="cir <?php if($i==0) echo 'active';?>"></div>
            <?php }//end for?>   
             </div>
         </div><!--/pagination-->
         </div><!--/slide-->
         
         <div class="images">
         <?php  $i=0;foreach($images_list as $image){?>
         <img alt='image' class="<?php if($i==0) {echo 'active';$i++;}?>" src="<?php echo "images/".$image['i_file'];?>" big-title="<?php echo $image['i_bigtitle'];?>" 
         small-title="<?php echo $image['i_smalltitle'];?>" desc="<?php echo $image['i_desc'];?>" link="<?php echo $image['i_link'];?>" />
         <?php } ?>
         </div><!--images-->
         <?php }//end if?>
       </div><!--/sections-->
       
        <div id="sec2" class="sections">
           <div class="title">New Episodes<a style="float:right; color:#fff;background:#23B95D;padding:2px 5px;border-radius:3px;font-size:14px; font-weight:bold;" href="http://www.animecenter.tv/latest-episodes">More</a></div>
           <?php 
		   $day1=date("Y-m-d");
		   $hr1=date("H:i:s");
		   $cp = 0;
		   foreach($episodes_list as $episode) {
		   $cp = $cp + 1;
		   if($cp == 4 or $cp == 8 or $cp == 12) { $pad = 'end'; } else { $pad ='';}
		   $ser=mysql_fetch_assoc($ob->get_table("an_series","a_id=".$episode['e_series']));
		   $day2=date("Y-m-d H:i:s");
		   $hr2=date("Y-m-d H:i:s",strtotime($episode['e_date']));
		   
		   $first  = new DateTime("now");
		   $second = new DateTime(date("Y-m-d H:i:s",$episode['e_date']));
			
			$diff = $first->diff( $second );
			$link=$url.$options[4]['o_value'].str_replace(" ","-",strtolower($episode['e_title']));
			$image=thumbcreate($episode['e_subdub']);
		   ?>
           <a href="<?php echo $link;?>">
           <div class="block <? echo $pad?>">
           <div class="main_title"><?php echo (strlen($ser['a_title'])<20)?$ser['a_title']:substr($ser['a_title'],0,20)."..."; ?></div>
	   <?php
	   $sn = $ser['a_title'];
	   $sn = str_replace(' ','-',$sn);
	   $sn = str_replace(':','',$sn);
	   $snf = strtolower('/thumb/'.$sn.'-thumb.jpg');
	   $path = '/home/daiky/public_html';
	   $check = $path.$snf;
	   if (file_exists($check)) {
		   $image = $snf;
	   }
	   ?>
           <div class="img"><img alt='image' src="<?php echo $image; ?>" width="150" height="75" /><div class="type <?php echo $ser['a_type2']; if($episode['e_raw']!=NULL 
		   and $episode['e_subdub']==NULL) echo " raw"; ?>">
		   <?php if($episode['e_raw']!=NULL and $episode['e_subdub']==NULL) echo "RAW"; else echo $ser['a_type2']; ?></div>
	   <?php if($episode['e_hd']!=NULL){?>	   
           <div class="type mirror">HD</div>
            <?php }?>
           </div>
           <div class="play"></div>
           
           <div class="sub_title"><?php $tit=explode(" ",$episode['e_title']);echo "Episode ".end($tit);?></div>
           <div class="times">
           <?php  
           $day=$diff->format( '%d')+($diff->format( '%y')*365);
           $hr=$diff->format( '%H');  
           if($day<=0){
             if($hr<=0){
             echo $diff->format( '%i min' )." ago";
             }
             else{
             echo $diff->format( '%H hours %i min' )." ago";
             }
           }
           else{
           echo $diff->format( '%d day %H hours' )." ago";
		   //echo $episode['e_date'];
           }
		   //echo $diff->format( '%d day %H hours %i min' )." ago";
           ?> 
           </div>
           </div><!--/block-->
           </a>
           <?php } ?>
       </div><!--/sections-->
       
       <div id="sec3" class="sections">
         <div class="title">Recently Added Series
		 <a href="http://www.animecenter.tv/latest-anime" style="float:right; color:#fff;background:#23B95D;padding:2px 5px;border-radius:3px;font-size:14px; font-weight:bold;">More</a></div>
         <?php foreach($series_re_list as $series) {
		    $sublink=($series['a_type2']=="dubbed")?$options[3]['o_value']:$options[2]['o_value'];
			$link=$url.$sublink.str_replace(" ","-",strtolower($series['a_title'])); 
	      ?>
         <a href="<?php echo $link;?>">
         <div class="block">
         <div class="img"><img alt='image' src="<?php echo get_thumbnail('images/'.$series['a_image'], 127, 189);?>" width="127" height="189" /></div>
		 <!--timthumb.php?src=<?php echo $url;?>images/<?php echo $series['a_image']; ?>&amp;w=127&amp;h=189-->
         <div class="main_title"><?php echo (strlen($series['a_title'])<10)?$series['a_title']:substr($series['a_title'],0,10)."..."; ?></div>
         </div><!--/block-->
         </a>
         <?php }?>
         <div class="pagination" <?php if($num_pages<=1){echo "style='display:none'";}?>>
                      <?php 
					   if(isset($_GET['offset'])){
						  if($_GET['offset']==1){$next=2;$prev=1;}
						  elseif($_GET['offset']>1 and $_GET['offset']<$num_pages){$next=$_GET['offset']+1;$prev=$_GET['offset']-1;}
						  elseif($_GET['offset']>=$num_pages){$next=$num_pages;$prev=$num_pages-1;}
					  }
					  else{$next=2;$prev=1;}
					  if(isset($_GET['position']) and $_GET['position']!=NULL){$position=$_GET['position'];}
					  else{$position=NULL;}
					  ?>
                       <?php if(isset($_GET['offset']) and $_GET['offset']>1){ ?><a href="<?php echo $url; ?>" title="First Page">&laquo; First</a><?php }?>
                       <?php if(isset($_GET['offset']) and $_GET['offset']>1){ ?><a href="?offset=<?php echo $prev; ?>" title="Previous Page">&laquo; Previous</a><?php }?>
                       <?php 
					   if($num_pages<=10){
					   for($i=1;$i<=$num_pages;$i++){ ?>
                       <a href="?offset=<?php echo $i; ?>" class="number" title="1"><?php echo $i;?></a>
                       <?php }
					   }//end if number page
					   else{
					   $i=isset($_GET['offset'])?$_GET['offset']:1;
					   $targ=(($i+11)<=$num_pages)?$i+11:$num_pages;
					   $i=(($i+11)<=$num_pages)?$i:$num_pages-11;
					   for($i;$i<=$targ;$i++){
					   ?>
					   <a href="?offset=<?php echo $i; ?>" class="number" title="1"><?php echo $i;?></a>
					   <?php
					   }}//end else number page
					   ?>
                       <?php if(!isset($_GET['offset']) or $_GET['offset']<$num_pages){ ?><a href="?offset=<?php echo $next; ?>" title="Next Page">Next &raquo;</a><?php }?>
                       <?php if(!isset($_GET['offset']) or $_GET['offset']<$num_pages){ ?><a href="?offset=<?php echo $num_pages; ?>" title="Last Page">Last &raquo;</a><?php }?>
                     
                      </div>
	                  <!-- End .pagination -->
					  
         </div><!--sections-->
       </div><!--/left_content-->
       <div id="right_content"><?php include_once("sidebar-home.php");?></div>
   </div><!--/content-->
<?php require_once("footer.php"); ?>
