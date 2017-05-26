package com.example.androidconnecthtml5;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.net.URLEncoder;
import java.util.List;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener{


    private EditText etUserName;
    private EditText etUserPass;
    private Button btLogin;
    WebView webView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etUserName = (EditText) findViewById(R.id.et_user_name);
        etUserPass = (EditText) findViewById(R.id.et_user_pass);
        btLogin = (Button) findViewById(R.id.bt_login);

        btLogin.setOnClickListener(this);
        initWebView();
    }

    @Override
    protected void onResume() {
        super.onResume();
        Toast.makeText(LoginActivity.this, "onResume", Toast.LENGTH_SHORT).show();
//        if (isInAliPay)
//            webView.loadUrl("file:///android_asset/JSCallJavaPhoneActivity.htm");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Toast.makeText(LoginActivity.this, "onPause", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(View view) {
        if(view == btLogin){  //登录
            login();
        }
    }


    private void login(){
        String name = etUserName.getText().toString().trim();
        String pass = etUserPass.getText().toString().trim();
        if(TextUtils.isEmpty(name) || TextUtils.isEmpty(pass)){
            Toast.makeText(LoginActivity.this, "用户名或密码为空!", Toast.LENGTH_SHORT).show();
            return;
        }

        login(name,pass);


    }

    /**
     * 初始化网页
     */
    private void initWebView(){
        webView = new WebView(this);
        //设置支持js
        webView.getSettings().setJavaScriptEnabled(true);

        //不调用浏览器
        //webView.setWebViewClient(new WebViewClient());
        //支持alert
        webView.setWebChromeClient(new WebChromeClient());

        //添加js调用接口类，通过Android这个字段 调用这个类的方法
        webView.addJavascriptInterface(new JsInterface(),"Android");

        //加载网页
        webView.loadUrl("file:///android_asset/JavaAndJavaScriptCall.html");

    }


    /**
     * 调用网页的javaScript 方法代码
     * @param name 用户名
     * @param pass 密码
     */
    private void login(String name,String pass){
        webView.loadUrl("javascript:javaCallJsLogin("+"'"+name+"'"+","+"'"+pass+"')");
        //以后js通过Android这个字段调用这个JsInt
        setContentView(webView);
    }


    class JsInterface{
        /**
         * 将会被js调用
         * JavascriptInterface 兼容高api
         */
        @JavascriptInterface
        public void showToast(){
            Toast.makeText(LoginActivity.this, "我的Android代码", Toast.LENGTH_SHORT).show();
            doVerify(url);
        }
    }

    private String url = "https://zmopenapi.zmxy.com.cn/openapi.do?sign=rr8lb07UarEXFp2gckiAc28y%2BeHHdq%2BYwWFBW3bl1iYMKK2ScHFYtZRdOxWwBgbqBily5P6455c4QjumfF%2BRQhHgFr6DrA7RfMDp3tQMbTAn7wtAR8vGE8o%2BuCKAgDMzF2lfqCSn%2BGcOtbhSwnNbJDJAsNWerlezkSTu0YrMLvA%3D&signtype=RSA&charset=UTF-8&appid=1000509&method=zhima.customer.certification.certify&version=1.0?ms=TNjy6EwBUey02QxJF4VUB4UjkRL1NjLHrK7XKD1J9sGvjvVPXGT7e1cupoxr%2BBZS1OXbhpf4LTRVzPIgROiyk6az%2BFFU7ud0378ugHn8UbqHu%2FvbeTRsEY0FDAekCv6AmY6xbVZRDkClVuM9k1KlZ6bVRvs%2F1zUgvjP8iSivKA0%3D";
    private boolean isInAliPay=false;//测试这么写
    /*
     *启动支付宝进行认证
     *@param url 开放平台返回的URL
     */
    private void doVerify(String url) {
        if (hasApplication()) {
            Intent action = new Intent(Intent.ACTION_VIEW);
            StringBuilder builder = new StringBuilder();
            // 这里使用固定appid 20000067
            builder.append("alipays://platformapi/startapp?appId=20000067&url=");
            builder.append(URLEncoder.encode(url));
            action.setData(Uri.parse(builder.toString()));
//            startActivity(action);
            startActivityForResult(action,1);
            isInAliPay = true;
        } else {
            //处理没有安装支付宝的情况
            new AlertDialog.Builder(this)
                    .setMessage("是否下载并安装支付宝完成认证?")
                    .setPositiveButton("好的", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            Intent action = new Intent(Intent.ACTION_VIEW);
                            action.setData(Uri.parse("https://m.alipay.com"));
                            startActivity(action);
                        }
                    }).setNegativeButton("算了", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            }).show();
        }
    }

    /*
     *判断是否安装了支付宝
     *@return true 为已经安装
     */
    private boolean hasApplication() {
        PackageManager manager = getPackageManager();
        Intent action = new Intent(Intent.ACTION_VIEW);
        action.setData(Uri.parse("alipays://"));
        List list = manager.queryIntentActivities(action, PackageManager.GET_RESOLVED_FILTER);
        return list != null && list.size() > 0;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Toast.makeText(LoginActivity.this, "onActivityResult:" + requestCode+"__"+ resultCode, Toast.LENGTH_SHORT).show();
    }
}
