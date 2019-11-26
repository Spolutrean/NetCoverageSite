package com.example.yamap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;

@Controller
public class MapController {
    @GetMapping
    public String loadMapPage(Device device) {
        if(device.isNormal()) {
            return "map";
        } else {
            return "mapMobile";
        }
    }

    @GetMapping("/mobile")
    public String loadMapPageMobile() {
        return "mapMobile";
    }

    @RequestMapping(method = RequestMethod.POST, value = "/data")
    @ResponseBody
    public ResponseEntity acceptData(InputStream dataStream) throws Exception {
        byte[] arr = dataStream.readAllBytes();
        return new ResponseEntity(HttpStatus.OK);
    }
}
