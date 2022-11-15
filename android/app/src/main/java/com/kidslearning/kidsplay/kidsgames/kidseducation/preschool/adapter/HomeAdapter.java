package com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.adapter;

import android.content.Context;
import android.content.Intent;
import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.request.RequestOptions;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.R;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.activity.HomeActivity;
import com.kidslearning.kidsplay.kidsgames.kidseducation.preschool.activity.video.VideoLearningActivity;

/**
 * Created by Naynesh Patel on 06-Feb-19.
 */
public class HomeAdapter extends RecyclerView.Adapter<HomeAdapter.ViewHolder> {

    Context context;
    int[] arrOfCategory;
    onClickMain onClickMain;

    public HomeAdapter(Context context, int[] arrOfCategory,onClickMain onClickMain) {
        this.context = context;
        this.arrOfCategory = arrOfCategory;
        this.onClickMain = onClickMain;
    }

    public int getItemCount() {
        return arrOfCategory.length;
    }


    @NonNull
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        return new ViewHolder(LayoutInflater.from(context).inflate(R.layout.card_list_start, viewGroup, false));
    }

    public void onBindViewHolder(@NonNull ViewHolder viewHolder, final int i) {

        Glide.with(context).load(arrOfCategory[i]).apply(new RequestOptions().diskCacheStrategy(DiskCacheStrategy.ALL)).into(viewHolder.imgThumbnail);

        viewHolder.cVHomeCategories.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onClickMain.onClickCategory(i);

            }
        });
    }


    class ViewHolder extends RecyclerView.ViewHolder {
        CardView cVHomeCategories;
        ImageView imgThumbnail;

        ViewHolder(@NonNull View view) {
            super(view);
            this.cVHomeCategories = view.findViewById(R.id.cVHomeCategories);
            this.imgThumbnail = view.findViewById(R.id.imgThumbnail);
        }
    }

    public interface onClickMain{
        void onClickCategory(int pos);
    }

}



