package com.ssafy.anudar.dto;

import com.ssafy.anudar.model.Work;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class WorkDto {
    private Long id;
    private String title;
    private String image;
    private String detail;
    private Integer price;
    private Integer bid;
    private String author;
    private String author_name;
    private Boolean is_carousel;

    public static WorkDto fromEntity (Work work) {
        return new WorkDto(
                work.getId(),
                work.getTitle(),
                work.getImage(),
                work.getDetail(),
                work.getPrice(),
                work.getBid(),
                work.getUser().getUsername(),
                work.getUser().getName(),
                work.getIs_carousel()
        );
    }
}
