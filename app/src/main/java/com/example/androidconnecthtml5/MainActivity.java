package com.example.androidconnecthtml5;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    private Button btOne;
    private Button btTwo;
    private Button btThree;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        btOne = (Button) findViewById(R.id.bt_one);
        btTwo = (Button) findViewById(R.id.bt_two);
        btThree = (Button) findViewById(R.id.bt_three);

        btOne.setOnClickListener(this);
        btThree.setOnClickListener(this);
        btTwo.setOnClickListener(this);

    }


    @Override
    public void onClick(View view) {
        if(view == btOne){
            startActivity(new Intent(this,LoginActivity.class));
        }else if(view == btTwo){
            startActivity(new Intent(this,VideoActivity.class));

        }else if(view == btThree){
            startActivity(new Intent(this,PhoneActivity.class));

        }
    }
}
