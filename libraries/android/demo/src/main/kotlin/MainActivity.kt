package com.woocommerce.shared.demo

import android.content.Intent
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
import com.woocommerce.shared.library.ReactActivity

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(
            FrameLayout(this).apply {
                addView(
                    Button(this@MainActivity).apply {
                        text = "React Activity"
                        layoutParams = FrameLayout.LayoutParams(
                            FrameLayout.LayoutParams.WRAP_CONTENT,
                            FrameLayout.LayoutParams.WRAP_CONTENT,
                            Gravity.CENTER
                        )
                        setOnClickListener {
                            startReactActivity()
                        }
                    }
                )
            }
        )
    }

    private fun startReactActivity() {
        val intent = Intent(this@MainActivity, ReactActivity::class.java)
        startActivity(intent)
    }
}
