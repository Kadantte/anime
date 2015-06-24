<?php
$src_image = $_GET['src'];
$thumbnail_width = $_GET['w'];
$thumbnail_width = $_GET['h'];
$dest_image = "animethumb/" . $_GET['w'] . "x" . $_GET['h'] . "/";
echo resize_crop($src_image, $dest_image, $thumbnail_width, $thumbnail_height);
function resize_crop($src_image, $dest_image, $thumbnail_width, $thumbnail_height, $jpg_quality = 100)
{


    // Get dimensions of existing image
    $image = getimagesize($src_image);

    // Check for valid dimensions
    if ($image[0] <= 0 || $image[1] <= 0) {
        return false;
    }

    //image MIME-type
    $image['format'] = strtolower(preg_replace('/^.*?\//', '', $image['mime']));

    // Import image
    switch ($image['format']) {
        case 'jpg':
        case 'jpeg':
            $image_data = imagecreatefromjpeg($src_image);
            break;
        case 'png':
            $image_data = imagecreatefrompng($src_image);
            break;
        case 'gif':
            $image_data = imagecreatefromgif($src_image);
            break;
        default:
            // Unsupported format
            return false;
            break;
    }

    $ratio_orig = $image[0] / $image[1];

    if ($thumbnail_width / $thumbnail_height > $ratio_orig) {
        $resize_height = $thumbnail_width / $ratio_orig;
        $resize_width = $thumbnail_width;

        //crop
        $x_offset = 0;
        $y_offset = $resize_height / 2 - ($thumbnail_height / 2);
    } else {
        $resize_width = $thumbnail_height * $ratio_orig;
        $resize_height = $thumbnail_height;

        //crop
        $x_offset = $resize_width / 2 - ($thumbnail_width / 2);
        $y_offset = 0;
    }

    //resize
    $resize = imagecreatetruecolor(round($resize_width), round($resize_height));

    if (imagecopyresampled($resize, $image_data, 0, 0, 0, 0, $resize_width, $resize_height, $image[0], $image[1])) {

        //crop
        $crop = imagecreatetruecolor($thumbnail_width, $thumbnail_height);

        if (imagecopyresampled($crop, $resize, 0, 0, $x_offset, $y_offset, $thumbnail_width, $thumbnail_height,
            $thumbnail_width, $thumbnail_height)) {

            // Create thumbnail
            switch (strtolower(preg_replace('/^.*\./', '', $dest_image))) {
                case 'jpg':
                case 'jpeg':
                    return imagejpeg($crop, $dest_image, $jpg_quality);
                    break;
                case 'png':
                    return imagepng($crop, $dest_image);
                    break;
                case 'gif':
                    return imagegif($crop, $dest_image);
                    break;
                default:
                    // Unsupported format
                    return false;
                    break;
            }

            //purge tmp
            imagedestroy($crop);
            imagedestroy($resize);
            imagedestroy($image_data);
        } else {
            return false;
        }
    }
}