package com.adroady.petpycare;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin; 
import java.util.ArrayList;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.capacitorjs.plugins.storage.StoragePlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initializes the Bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
            // Additional plugins you've installed go here
            add(GoogleAuth.class);
             registerPlugin(StoragePlugin.class);
        }});
    }
}
