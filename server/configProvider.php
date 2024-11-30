<?php
$key = $_GET["key"];

if (!is_dir("../config/$key")) {
    $key = "default";
}

$result = [];

function getImages($key)
{
    $images = [];

    $rawImages = scandir("../config/$key/pic");

    foreach ($rawImages as $rawImage) {
        if ($rawImage == "." || $rawImage == "..") {
            continue;
        }

        $images[] = "/inbox/config/$key/pic/$rawImage";
    }

    return $images;
}

function getTexts($key) {
    return file("../config/$key/texts.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}

function getUrls($key) {
    return file("../config/$key/urls.txt", FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
}

$result["images"] = getImages($key);
$result["texts"] = getTexts($key);
$result["urls"] = getUrls($key);

echo json_encode($result);
